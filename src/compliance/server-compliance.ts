import type { DefaultParams, TradeMethod } from "@/types";
import type {
  ComplianceServerIntegration,
  ComplianceConfig,
  ComplianceUserConfig,
} from "./types";
import type { Context } from "@/types";
import { TradeHandlerFactory } from "./handlers/factory";

export class ServerCompliance<P extends DefaultParams> {
  private tradeHandlerFactory: TradeHandlerFactory<P>;

  public constructor(
    public readonly config: ComplianceConfig,
    public readonly userConfig: ComplianceUserConfig<P>,
    public readonly context: Context,
    integration: ComplianceServerIntegration<P>
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<P>(integration);
  }

  public handleTrade(tradeMethod: TradeMethod) {
    switch (tradeMethod) {
      case "OpenRTB v2.6":
        return this.handleOpenRTBv26();
    }
  }

  public handleOpenRTBv26() {
    return this.tradeHandlerFactory.createOpenRTBv26(
      this.userConfig,
      this.context
    );
  }
}
