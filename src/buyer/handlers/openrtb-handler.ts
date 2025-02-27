import type { Context, DefaultParams } from "@/types";
import type { BuyerOpenRTBIntegration, BuyerUserConfig } from "../types";
import { OpenRTB26Handler } from "./openrtb-26-handler";

export class OpenRTBHandler<P extends DefaultParams> {
  public constructor(
    private userConfig: BuyerUserConfig<P>,
    private context: Context,
    private integration: BuyerOpenRTBIntegration<P, Context>
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
