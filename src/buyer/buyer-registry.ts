import type { Context, DefaultParams, Runtime } from "@/types";
import { loadBuyer } from "./load-buyer";
import type { Buyer, BuyerUserConfig } from "./types";
import type { ClientBuyer } from "./client-buyer";
import type { ServerBuyer } from "./server-buyer";

export class BuyerRegistry {
  private modules = new Map<string, typeof loadBuyer>();

  public register(name: string, loader: typeof loadBuyer) {
    this.modules.set(name, loader);
  }

  public async loadForClient<P extends DefaultParams>(
    name: string,
    userConfig: BuyerUserConfig<P>,
    context: Context
  ): Promise<ClientBuyer<P>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientBuyer<P>
    >;
  }

  public async loadForServer<P extends DefaultParams>(
    name: string,
    userConfig: BuyerUserConfig<P>,
    context: Context
  ): Promise<ServerBuyer<P>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerBuyer<P>
    >;
  }

  public async load<P extends DefaultParams>(
    name: string,
    runtime: Runtime,
    userConfig: BuyerUserConfig<P>,
    context: Context
  ): Promise<Buyer<P>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<P>(name, runtime, context, userConfig);
  }
}
