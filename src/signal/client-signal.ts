import type { DefaultParams, TradeMethod } from "@/types";
import type {
  SignalClientIntegration,
  SignalConfig,
  SignalUserConfig,
} from "./types";
import type { OpenRTBHandler } from "./handlers/openrtb-handler";
import type { AdCOMContext } from "@/types/adcom";
import { TradeHandlerFactory } from "./handlers/factory";

export class ClientSignal<P extends DefaultParams, C extends AdCOMContext> {
  private tradeHandlerFactory: TradeHandlerFactory<P, C>;

  public constructor(
    public readonly config: SignalConfig,
    public readonly userConfig: SignalUserConfig<P>,
    public readonly context: C,
    integration: SignalClientIntegration<P>
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
