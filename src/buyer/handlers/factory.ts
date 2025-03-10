import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
  DefaultParams,
} from "@/types";
import type {
  BuyerIntegration,
  BuyerOpenRTB26Integration,
  BuyerUserConfig,
} from "../types";
import { OpenRTB26Handler } from "./openrtb-26-handler";

export class TradeHandlerFactory<P extends DefaultParams> {
  public constructor(private integration: BuyerIntegration<P>) {}

  public createOpenRTBv26(userConfig: BuyerUserConfig<P>, context: Context) {
    let integration: BuyerOpenRTB26Integration<P, Context>;

    if (
      context.channel === "site" &&
      this.integration.channel?.site?.openrtbV26
    ) {
      integration = this.integration.channel.site.openrtbV26;
    } else if (
      context.channel === "app" &&
      this.integration.channel?.app?.openrtbV26
    ) {
      integration = this.integration.channel.app.openrtbV26;
    } else if (
      context.channel === "dooh" &&
      this.integration.channel?.dooh?.openrtbV26
    ) {
      integration = this.integration.channel.dooh.openrtbV26;
    } else {
      throw new Error("OpenRTB integration not found");
    }

    return new OpenRTB26Handler<P>(
      userConfig,
      context,
      integration
    );
  }
}
