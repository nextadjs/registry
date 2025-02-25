import type { DefaultParams, TradeMethod } from "@/types";
import type {
  ComplianceServerIntegration,
  ComplianceConfig,
  ComplianceUserConfig,
} from "./types";
import type { OpenRTBHandler } from "./handlers/openrtb-handler";
import type { AdCOMContext } from "@/types/adcom";
import { TradeHandlerFactory } from "./handlers/factory";

export class ServerCompliance<T1 extends DefaultParams, T2 extends AdCOMContext> {
  private tradeHandlerFactory: TradeHandlerFactory<T1, T2>;

  public constructor(
    public readonly config: ComplianceConfig,
    public readonly userConfig: ComplianceUserConfig<T1>,
    public readonly context: T2,
    integration: ComplianceServerIntegration<T1>
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<T1, T2>(integration);
  }

  public handleTrade(tradeMethod: TradeMethod) {
    switch (tradeMethod) {
      case "OpenRTB":
        return this.handleOpenRTB();
    }
  }

  public handleOpenRTB(): OpenRTBHandler<T1, T2> {
    return this.tradeHandlerFactory.createOpenRTB(
      this.userConfig,
      this.context
    );
  }
}
