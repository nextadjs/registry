import type { DefaultParams } from "@/types";
import type {
  BuyerOpenRTB26Integration,
  BuyerUserConfig,
  OpenRTBRequestConfig,
} from "../types";
import type { AdCOMContext } from "@/types/adcom";

export class OpenRTB26Handler<
  T1 extends DefaultParams,
  T2 extends AdCOMContext
> {
  public constructor(
    private userConfig: BuyerUserConfig<T1>,
    private context: T2,
    private integration: BuyerOpenRTB26Integration<T1, T2>
  ) {}

  public configureRequest(): OpenRTBRequestConfig {
    return this.integration.configureRequest(
      this.userConfig.params,
      this.context
    );
  }
}
