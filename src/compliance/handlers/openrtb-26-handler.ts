import type { DefaultParams } from "@/types";
import type {
  SignalOpenRTB26Integration,
  SignalUserConfig,
} from "../types";
import type { AdCOMContext } from "@/types/adcom";
import type { V26BidRequest } from "@/types/openrtb";

export class OpenRTB26Handler<
  P extends DefaultParams
> {
  public constructor(
    private userConfig: SignalUserConfig<P>,
    private context: AdCOMContext,
    private integration?: SignalOpenRTB26Integration<P, AdCOMContext>
  ) {}

  public decorateBidRequest(bidRequest: Omit<V26BidRequest, 'imp'>) {
    if (this.integration?.decorateBidRequest) {
      return this.integration.decorateBidRequest(bidRequest, this.userConfig.params, this.context);
    }

    return bidRequest;
  }
}
