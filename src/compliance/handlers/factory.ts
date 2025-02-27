import type { DefaultParams } from "@/types";
import { OpenRTBHandler } from "./openrtb-handler";
import type { AdCOMContext, AdCOMContextWithApp, AdCOMContextWithDooh, AdCOMContextWithSite } from "@/types/adcom";
import type {
  ComplianceIntegration,
  ComplianceOpenRTBIntegration,
  ComplianceUserConfig,
} from "../types";

export class TradeHandlerFactory<
  P extends DefaultParams
> {
  public constructor(private integration: ComplianceIntegration<P>) {}

  public createOpenRTB(userConfig: ComplianceUserConfig<P>, context: AdCOMContext) {
    if (!this.integration?.openrtb) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    let integration: ComplianceOpenRTBIntegration<P, AdCOMContext> = this.integration.openrtb;

    if (context?.site && this.integration.context?.site?.openrtb) {
      integration = Object.assign(
        this.integration.context?.site?.openrtb,
        integration
      ) as ComplianceOpenRTBIntegration<P, AdCOMContextWithSite>;
    } else if (context?.app && this.integration.context?.app?.openrtb) {
      integration = Object.assign(
        this.integration.context.app.openrtb,
        integration
      ) as ComplianceOpenRTBIntegration<P, AdCOMContextWithApp>;
    } else if (context?.dooh && this.integration.context?.dooh?.openrtb) {
      integration = Object.assign(
        this.integration.context.dooh.openrtb,
        integration
      ) as ComplianceOpenRTBIntegration<P, AdCOMContextWithDooh>;
    }

    return new OpenRTBHandler<P>(
      userConfig,
      context,
      this.integration.openrtb
    );
  }
}
