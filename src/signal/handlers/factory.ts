import type { DefaultParams } from "@/types";
import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
} from "@/types";
import type {
  SignalIntegration,
  SignalOpenRTB26Integration,
  SignalUserConfig,
} from "../types";
import { OpenRTB26Handler } from "./openrtb-26-handler";
import { ContextHandler } from "./context-handler";

export class TradeHandlerFactory<D, P extends DefaultParams> {
  public constructor(private integration: SignalIntegration<D, P>) {}

  public createOpenRTBv26(
    data: D,
    userConfig: SignalUserConfig<P>,
    context: Context
  ) {
    if (!this.integration?.openrtbV26) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    let integration: SignalOpenRTB26Integration<D, P, Context> =
      this.integration.openrtbV26;

    if (
      context.channel === "site" &&
      this.integration.context?.site?.openrtbV26
    ) {
      integration = Object.assign(
        this.integration.context?.site?.openrtbV26,
        integration
      ) as SignalOpenRTB26Integration<D, P, ContextWithSite>;
    } else if (
      context.channel === "app" &&
      this.integration.context?.app?.openrtbV26
    ) {
      integration = Object.assign(
        this.integration.context.app.openrtbV26,
        integration
      ) as SignalOpenRTB26Integration<D, P, ContextWithApp>;
    } else if (
      context.channel === "dooh" &&
      this.integration.context?.dooh?.openrtbV26
    ) {
      integration = Object.assign(
        this.integration.context.dooh.openrtbV26,
        integration
      ) as SignalOpenRTB26Integration<D, P, ContextWithDooh>;
    }

    return new OpenRTB26Handler<D, P>(
      data,
      userConfig,
      context,
      this.integration.openrtbV26
    );
  }

  public createContext(
    data: D,
    userConfig: SignalUserConfig<P>,
    context: Context
  ) {
    return new ContextHandler<D, P>(
      data,
      userConfig,
      context,
      this.integration.context
    );
  }
}
