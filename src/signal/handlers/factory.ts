import type { DefaultParams } from "@/types";
import { OpenRTBHandler } from "./openrtb-handler";
import type { AdCOMContext } from "@/types/adcom";
import type { SignalIntegration, SignalUserConfig } from "../types";

export class TradeHandlerFactory<
  T1 extends DefaultParams,
  T2 extends AdCOMContext
> {
  public constructor(private integration: SignalIntegration<T1>) {}

  public createOpenRTB(userConfig: SignalUserConfig<T1>, context: T2) {
    if (!this.integration?.openrtb) {
      // TODO: 適切な例外
      throw new Error("OpenRTB integration not found");
    }

    return new OpenRTBHandler<T1, T2>(
      userConfig,
      context,
      this.integration.openrtb
    );
  }
}
