import type { DefaultParams, Runtime } from "@/types";
import type { BuyerClientIntegration, BuyerServerIntegration, BuyerUserConfig } from "./types";
import { ServerBuyer } from "./server-buyer";
import type { AdCOMContext } from "@/types/adcom";
import { ClientBuyer } from "./client-buyer";

export const loadBuyer = async <
  T1 extends DefaultParams,
  T2 extends AdCOMContext
>(
  name: string,
  runtime: Runtime,
  context: T2,
  userConfig: BuyerUserConfig<T1>
) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const integration = (await import(`@buyers/${name}/server`))
      .default as BuyerServerIntegration<T1>;
    const config = await import(`@buyers/${name}/buyer.json`);
    return new ServerBuyer(config, userConfig, context, integration);
  } else if (runtime === "client") {
    const integration = (await import(`@buyers/${name}/client`))
      .default as BuyerClientIntegration<T1>;
    const config = await import(`@buyers/${name}/buyer.json`);
    return new ClientBuyer(config, userConfig, context, integration);
  }

  throw new Error();
};
