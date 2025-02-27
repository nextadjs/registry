import type { DefaultParams } from "@/types";
import { OpenRTBHandler } from "./openrtb-handler";
import type { AdCOMContext, AdCOMContextWithApp, AdCOMContextWithDooh, AdCOMContextWithSite } from "@/types/adcom";
import type {
  BuyerIntegration,
  BuyerOpenRTBIntegration,
  BuyerUserConfig,
} from "../types";

export class TradeHandlerFactory<
  P extends DefaultParams
> {
  public constructor(private integration: BuyerIntegration<P>) {}

  public createOpenRTB(userConfig: BuyerUserConfig<P>, context: AdCOMContext) {
    if (!this.integration?.openrtb) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    let integration: BuyerOpenRTBIntegration<P, AdCOMContext> = this.integration.openrtb;

    if (context?.site && this.integration.context?.site?.openrtb) {
      integration = Object.assign(
        this.integration.context.site.openrtb,
        integration
      ) as BuyerOpenRTBIntegration<P, AdCOMContextWithSite>;
    } else if (context?.app && this.integration.context?.app?.openrtb) {
      integration = Object.assign(
        this.integration.context.app.openrtb,
        integration
      ) as BuyerOpenRTBIntegration<P, AdCOMContextWithApp>;
    } else if (context?.dooh && this.integration.context?.dooh?.openrtb) {
      integration = Object.assign(
        this.integration.context.dooh.openrtb
      ) as BuyerOpenRTBIntegration<P, AdCOMContextWithDooh>;
    }

    return new OpenRTBHandler<P>(
      userConfig,
      context,
      this.integration.openrtb
    );
  }
}
