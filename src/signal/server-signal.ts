import type { DefaultParams, Runtime, TradeMethod } from "@/types";
import type {
  ServerAsyncCollect,
  SignalServerIntegration,
} from "./types";
import { Signal } from "./signal";

export class ServerSignal<D, P extends DefaultParams> extends Signal<
  D,
  SignalServerIntegration<D, P>,
  P
> {
  public readonly runtime: Runtime = 'server';

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
