import type { DefaultParams, TradeMethod } from "@/types";
import type {
  BuyerServerIntegration,
  BuyerConfig,
  BuyerUserConfig,
} from "./types";
import type { OpenRTBHandler } from "./handlers/openrtb-handler";
import type { AdCOMContext } from "@/types/adcom";
import { TradeHandlerFactory } from "./handlers/factory";

export class ServerBuyer<P extends DefaultParams, C extends AdCOMContext> {
  private tradeHandlerFactory: TradeHandlerFactory<P, C>;

  public constructor(
    public readonly config: BuyerConfig,
    public readonly userConfig: BuyerUserConfig<P>,
    public readonly context: C,
    integration: BuyerServerIntegration<P>
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<P, C>(integration);
  }

  public handleTrade(tradeMethod: TradeMethod) {
    switch (tradeMethod) {
      case "OpenRTB":
        return this.handleOpenRTB();
    }
  }

  public handleOpenRTB(): OpenRTBHandler<P, C> {
    return this.tradeHandlerFactory.createOpenRTB(
      this.userConfig,
      this.context
    );
  }
}
