import type { Context, DefaultParams, TradeMethod } from "@/types";
import type {
  BuyerClientIntegration,
  BuyerConfig,
  BuyerUserConfig,
} from "./types";
import { TradeHandlerFactory } from "./handlers/factory";

export class ClientBuyer<P extends DefaultParams> {
  private tradeHandlerFactory: TradeHandlerFactory<P>;

  public constructor(
    public readonly config: BuyerConfig,
    public readonly userConfig: BuyerUserConfig<P>,
    public readonly context: Context,
    integration: BuyerClientIntegration<P>
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
