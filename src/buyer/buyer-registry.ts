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

  public async loadForClient<P extends DefaultParams, C extends AdCOMContext>(
    name: string,
    userConfig: BuyerUserConfig<P>,
    context: C
  ): Promise<ClientBuyer<P, C>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientBuyer<P, C>
    >;
  }

  public async loadForServer<P extends DefaultParams, C extends AdCOMContext>(
    name: string,
    userConfig: BuyerUserConfig<P>,
    context: C
  ): Promise<ServerBuyer<P, C>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerBuyer<P, C>
    >;
  }

  public async load<P extends DefaultParams, C extends AdCOMContext>(
    name: string,
    runtime: Runtime,
    userConfig: BuyerUserConfig<P>,
    context: C
  ): Promise<Buyer<P, C>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<P, C>(name, runtime, context, userConfig);
  }
}
