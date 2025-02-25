import type { Runtime } from "@/types";
import type { BuyerSpec, BuyerUserConfig, ClientBuyerSpec, ServerBuyerSpec } from "./types";
import { Buyer } from "./buyer";
import { ServerBuyer } from "./server-buyer";
import { ClientBuyer } from "./client-buyer";

export const loadBuyer = async (name: string, runtime: Runtime, userConfig: BuyerUserConfig) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === 'server') {
    const spec = (await import(`@buyers/${name}/server`)).default as ServerBuyerSpec;
    const config = await import(`@buyers/${name}/buyer.json`);
    return new ServerBuyer(config, spec, userConfig);
  } else if (runtime === 'client') {
    const spec = (await import(`@buyers/${name}/client`)).default as ClientBuyerSpec;
    const config = await import(`@buyers/${name}/buyer.json`);
    return new ClientBuyer(config, userConfig, spec);
  }

  throw new Error();
};
