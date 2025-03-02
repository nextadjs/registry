import type { Context, DefaultParams, Runtime } from "@/types";
import type {
  BuyerClientIntegration,
  BuyerServerIntegration,
  BuyerUserConfig,
} from "./types";
import { ServerBuyer } from "./server-buyer";
import { ClientBuyer } from "./client-buyer";

export const loadBuyer = async <P extends DefaultParams>(
  name: string,
  runtime: Runtime,
  context: Context,
  userConfig: BuyerUserConfig<P>
) => {
  // TODO: 適切なエラーハンドリング
  try {
    if (runtime === "server") {
      const integration = (await import(`@buyers/${name}/server`))
        .default as BuyerServerIntegration<P>;
      const config = await import(`@buyers/${name}/buyer.json`);
      return new ServerBuyer(config, userConfig, context, integration);
    } else if (runtime === "client") {
      const integration = (await import(`@buyers/${name}/client`))
        .default as BuyerClientIntegration<P>;
      const config = await import(`@buyers/${name}/buyer.json`);
      return new ClientBuyer(config, userConfig, context, integration);
    }
  } catch (error) {
    throw new Error();
  }
};
