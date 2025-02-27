import type { Context, DefaultParams, TradeMethod } from "@/types";
import type {
  BuyerClientIntegration,
  BuyerConfig,
  BuyerUserConfig,
} from "./types";
import type { OpenRTBHandler } from "./handlers/openrtb-handler";
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
