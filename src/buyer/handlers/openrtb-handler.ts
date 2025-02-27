import type { DefaultParams } from "@/types";
import type { BuyerOpenRTBIntegration, BuyerUserConfig } from "../types";
import type { AdCOMContext } from "@/types/adcom";
import { OpenRTB26Handler } from "./openrtb-26-handler";

export class OpenRTBHandler<P extends DefaultParams, C extends AdCOMContext> {
  public constructor(
    private userConfig: BuyerUserConfig<P>,
    private context: C,
    private integration: BuyerOpenRTBIntegration<P, C>
  ) {}

  public handleV26() {
    if (!this.integration.v26) {
      throw new Error("");
    }

    return new OpenRTB26Handler(
      this.userConfig,
      this.context,
      this.integration.v26
    );
  }
}
