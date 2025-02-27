import type { DefaultParams } from "@/types";
import { OpenRTBHandler } from "./openrtb-handler";
import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
} from "@/types";
import type {
  SignalIntegration,
  SignalOpenRTBIntegration,
  SignalUserConfig,
} from "../types";

export class TradeHandlerFactory<P extends DefaultParams> {
  public constructor(private integration: SignalIntegration<P>) {}

  public createOpenRTB(userConfig: SignalUserConfig<P>, context: Context) {
    if (!this.integration?.openrtb) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    let integration: SignalOpenRTBIntegration<P, Context> =
      this.integration.openrtb;

    if (context.channel === "site" && this.integration.context?.site?.openrtb) {
      integration = Object.assign(
        this.integration.context?.site?.openrtb,
        integration
      ) as SignalOpenRTBIntegration<P, ContextWithSite>;
    } else if (
      context.channel === "app" &&
      this.integration.context?.app?.openrtb
    ) {
      integration = Object.assign(
        this.integration.context.app.openrtb,
        integration
      ) as SignalOpenRTBIntegration<P, ContextWithApp>;
    } else if (
      context.channel === "dooh" &&
      this.integration.context?.dooh?.openrtb
    ) {
      integration = Object.assign(
        this.integration.context.dooh.openrtb,
        integration
      ) as SignalOpenRTBIntegration<P, ContextWithDooh>;
    }

    return new OpenRTBHandler<P>(userConfig, context, this.integration.openrtb);
  }
}
