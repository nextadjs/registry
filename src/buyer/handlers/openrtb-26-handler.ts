import type { Context, DefaultParams } from "@/types";
import type {
  BuyerOpenRTB26Integration,
  BuyerUserConfig,
  OpenRTBRequestConfig,
} from "../types";
import type { V26Bid, V26BidRequest, V26Imp } from "@/types/openrtb";

export class OpenRTB26Handler<P extends DefaultParams> {
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

  public decorateBidRequest(
    bidRequest: Omit<V26BidRequest, "imp">
  ): Omit<V26BidRequest, "imp"> {
    return this.integration?.decorateBidRequest
      ? this.integration.decorateBidRequest(
          bidRequest,
          this.userConfig.params,
          this.context
        )
      : bidRequest;
  }

  decorateImpression(impression: V26Imp, bidRequest: V26BidRequest): V26Imp {
    return this.integration?.decorateImpression
      ? this.integration.decorateImpression(
          impression,
          bidRequest,
          this.userConfig.params,
          this.context
        )
      : impression;
  }
}
