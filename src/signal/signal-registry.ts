import type { DefaultParams, Runtime } from "@/types";
import { loadSignal } from "./load-signal";
import type { Signal, SignalUserConfig } from "./types";
import type { Context } from "@/types";
import type { ClientSignal } from "./client-signal";
import type { ServerSignal } from "./server-signal";

export class SignalRegistry {
  private modules = new Map<string, typeof loadSignal>();

  public register(name: string, loader: typeof loadSignal) {
    this.modules.set(name, loader);
  }

  public async loadForClient<P extends DefaultParams>(
    name: string,
    userConfig: SignalUserConfig<P>,
    context: Context
  ): Promise<ClientSignal<unknown, P>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientSignal<unknown, P>
    >;
  }

  public async loadForServer<P extends DefaultParams>(
    name: string,
    userConfig: SignalUserConfig<P>,
    context: Context
  ): Promise<ServerSignal<unknown, P>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerSignal<unknown, P>
    >;
  }

  public async load<P extends DefaultParams>(
    name: string,
    runtime: Runtime,
    userConfig: SignalUserConfig<P>,
    context: Context
  ): Promise<Signal<unknown, P>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<P>(name, runtime, context, userConfig);
  }
}
