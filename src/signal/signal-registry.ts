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

  public async loadForClient<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    userConfig: SignalUserConfig<T1>,
    context: T2
  ): Promise<ClientSignal<T1, T2>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientSignal<T1, T2>
    >;
  }

  public async loadForServer<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    userConfig: SignalUserConfig<T1>,
    context: T2
  ): Promise<ServerSignal<T1, T2>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerSignal<T1, T2>
    >;
  }

  public async load<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    runtime: Runtime,
    userConfig: SignalUserConfig<T1>,
    context: T2
  ): Promise<Signal<T1, T2>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<T1, T2>(name, runtime, context, userConfig);
  }
}
