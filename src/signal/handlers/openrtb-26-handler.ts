import type { DefaultParams } from "@/types";
import type { SignalOpenRTB26Integration, SignalUserConfig } from "../types";
import type { Context } from "@/types";
import type { V26BidRequest } from "@/types/openrtb";

export class OpenRTB26Handler<D, P extends DefaultParams> {
  public constructor(
    private data: D,
    private userConfig: SignalUserConfig<P>,
    private context: Context,
    private integration?: SignalOpenRTB26Integration<D, P, Context>
  ) {}

  public decorateBidRequest(bidRequest: Omit<V26BidRequest, "imp">) {
    if (this.integration?.decorateBidRequest) {
      return this.integration.decorateBidRequest(
        bidRequest,
        this.data,
        this.userConfig.params,
        this.context
      );
    }

    return bidRequest;
  }
}
