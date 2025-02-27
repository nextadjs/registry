import type { DefaultParams } from "@/types";
import type {
  BuyerOpenRTB26Integration,
  BuyerUserConfig,
  OpenRTBRequestConfig,
} from "../types";
import type { AdCOMContext } from "@/types/adcom";

export class OpenRTB26Handler<
  P extends DefaultParams
> {
  public constructor(
    private userConfig: BuyerUserConfig<P>,
    private context: AdCOMContext,
    private integration: BuyerOpenRTB26Integration<P, AdCOMContext>
  ) {}

  public configureRequest(): OpenRTBRequestConfig {
    return this.integration.configureRequest(
      this.userConfig.params,
      this.context
    );
  }
}
