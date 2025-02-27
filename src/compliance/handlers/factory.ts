import type { DefaultParams } from "@/types";
import { OpenRTBHandler } from "./openrtb-handler";
import type { AdCOMContext } from "@/types/adcom";
import type {
  ComplianceIntegration,
  ComplianceOpenRTBIntegration,
  ComplianceUserConfig,
} from "../types";

export class TradeHandlerFactory<
  P extends DefaultParams,
  C extends AdCOMContext
> {
  public constructor(private integration: ComplianceIntegration<P>) {}

  public createOpenRTB(userConfig: ComplianceUserConfig<P>, context: C) {
    if (!this.integration?.openrtb) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    let integration: ComplianceOpenRTBIntegration<P, C> =
      this.integration.openrtb;

    if (context?.site && this.integration.context?.site?.openrtb) {
      integration = Object.assign(
        this.integration.context.site.openrtb,
        integration
      ) as ComplianceOpenRTBIntegration<P, C>;
    } else if (context?.app && this.integration.context?.app?.openrtb) {
      integration = Object.assign(
        this.integration.context.app.openrtb,
        integration
      ) as ComplianceOpenRTBIntegration<P, C>;
    } else if (context?.dooh && this.integration.context?.dooh?.openrtb) {
      integration = Object.assign(
        this.integration.context.dooh.openrtb
      ) as ComplianceOpenRTBIntegration<P, C>;
    }

    return new OpenRTBHandler<P, C>(
      userConfig,
      context,
      this.integration.openrtb
    );
  }
}
