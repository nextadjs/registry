import type { DefaultParams, TradeMethod } from "@/types";
import type {
  ComplianceClientIntegration,
  ComplianceConfig,
  ComplianceUserConfig,
} from "./types";
import type { OpenRTBHandler } from "./handlers/openrtb-handler";
import type { Context } from "@/types";
import { TradeHandlerFactory } from "./handlers/factory";

export class ClientCompliance<P extends DefaultParams> {
  private tradeHandlerFactory: TradeHandlerFactory<P>;

  public constructor(
    public readonly config: ComplianceConfig,
    public readonly userConfig: ComplianceUserConfig<P>,
    public readonly context: Context,
    integration: ComplianceClientIntegration<P>
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<P>(integration);
  }

  public handleTrade(tradeMethod: TradeMethod) {
    switch (tradeMethod) {
      case "OpenRTB":
        return this.handleOpenRTB();
    }
  }

  public handleOpenRTB(): OpenRTBHandler<P> {
    return this.tradeHandlerFactory.createOpenRTB(
      this.userConfig,
      this.context
    );
  }
}
