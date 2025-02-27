import type { DefaultParams, TradeMethod } from "@/types";
import type {
  ClientAsyncCollect,
  SignalClientIntegration,
} from "./types";
import { Signal } from "./signal";

export class ClientSignal<D, P extends DefaultParams> extends Signal<
  D,
  SignalClientIntegration<D, P>,
  P
> {
  public handleTrade(tradeMethod: TradeMethod) {
    switch (tradeMethod) {
      case "OpenRTB v2.6":
        return this.handleOpenRTBv26();
    }
  }

  public handleOpenRTBv26() {
    return this.tradeHandlerFactory.createOpenRTBv26(
      this.data,
      this.userConfig,
      this.context
    );
  }

  public handleContext() {
    return this.tradeHandlerFactory.createContext(
      this.data,
      this.userConfig,
      this.context
    );
  }
}
