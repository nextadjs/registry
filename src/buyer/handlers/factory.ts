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
    if (!this.integration?.openrtbV26) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    let integration: BuyerOpenRTB26Integration<P, Context> =
      this.integration.openrtbV26;

    if (
      context.channel === "site" &&
      this.integration.context?.site?.openrtbV26
    ) {
      integration = Object.assign(
        this.integration.context.site.openrtbV26,
        integration
      ) as BuyerOpenRTB26Integration<P, ContextWithSite>;
    } else if (
      context.channel === "app" &&
      this.integration.context?.app?.openrtbV26
    ) {
      integration = Object.assign(
        this.integration.context.app.openrtbV26,
        integration
      ) as BuyerOpenRTB26Integration<P, ContextWithApp>;
    } else if (
      context.channel === "dooh" &&
      this.integration.context?.dooh?.openrtbV26
    ) {
      integration = Object.assign(
        this.integration.context.dooh.openrtbV26
      ) as BuyerOpenRTB26Integration<P, ContextWithDooh>;
    }

    return new OpenRTB26Handler<P>(
      userConfig,
      context,
      this.integration.openrtbV26
    );
  }
}
