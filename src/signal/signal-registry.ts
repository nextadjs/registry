import type { DefaultParams, Runtime } from "@/types";
import { loadSignal } from "./load-signal";
import type { Signal, SignalUserConfig } from "./types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientSignal } from "./client-signal";
import type { ServerSignal } from "./server-signal";

export class SignalRegistry {
  private modules = new Map<string, typeof loadSignal>();

  public register(name: string, loader: typeof loadSignal) {
    this.modules.set(name, loader);
  }

  public async loadForClient<P extends DefaultParams, C extends AdCOMContext>(
    name: string,
    userConfig: SignalUserConfig<P>,
    context: C
  ): Promise<ClientSignal<P, C>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientSignal<P, C>
    >;
  }

  public async loadForServer<P extends DefaultParams, C extends AdCOMContext>(
    name: string,
    userConfig: SignalUserConfig<P>,
    context: C
  ): Promise<ServerSignal<P, C>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerSignal<P, C>
    >;
  }

  public async load<P extends DefaultParams, C extends AdCOMContext>(
    name: string,
    runtime: Runtime,
    userConfig: SignalUserConfig<P>,
    context: C
  ): Promise<Signal<P, C>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<P, C>(name, runtime, context, userConfig);
  }
}
