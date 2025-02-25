import type { DefaultParams, Runtime } from "@/types";
import { loadBuyer } from "./load-buyer";
import type { Buyer, BuyerUserConfig } from "./types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientBuyer } from "./client-buyer";
import type { ServerBuyer } from "./server-buyer";

export class BuyerRegistry {
  private modules = new Map<string, typeof loadBuyer>();

  public register(name: string, loader: typeof loadBuyer) {
    this.modules.set(name, loader);
  }

  public async loadForClient<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    userConfig: BuyerUserConfig<T1>,
    context: T2
  ): Promise<ClientBuyer<T1, T2>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientBuyer<T1, T2>
    >;
  }

  public async loadForServer<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    userConfig: BuyerUserConfig<T1>,
    context: T2
  ): Promise<ServerBuyer<T1, T2>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerBuyer<T1, T2>
    >;
  }

  public async load<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    runtime: Runtime,
    userConfig: BuyerUserConfig<T1>,
    context: T2
  ): Promise<Buyer<T1, T2>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<T1, T2>(name, runtime, context, userConfig);
  }
}
