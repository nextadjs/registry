import type { Context, DefaultParams } from "@/types";
import type {
  BuyerOpenRTB26Integration,
  BuyerUserConfig,
  OpenRTBRequestConfig,
} from "../types";

export class OpenRTB26Handler<
  P extends DefaultParams
> {
  public constructor(
    private userConfig: BuyerUserConfig<P>,
    private context: Context,
    private integration: BuyerOpenRTB26Integration<P, Context>
  ) {}

  public configureRequest(): OpenRTBRequestConfig {
    return this.integration.configureRequest(
      this.userConfig.params,
      this.context
    );
  }
}
