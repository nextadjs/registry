import type { DefaultParams } from "@/types";
import type {
  ComplianceOpenRTB26Integration,
  ComplianceUserConfig,
} from "../types";
import type { Context } from "@/types";
import type { V26BidRequest } from "@/types/openrtb";

export class OpenRTB26Handler<
  P extends DefaultParams
> {
  public constructor(
    private userConfig: ComplianceUserConfig<P>,
    private context: Context,
    private integration?: ComplianceOpenRTB26Integration<P, Context>
  ) {}

  public validateBidRequest(bidRequest: Omit<V26BidRequest, 'imp'>) {
    if (this.integration?.validateBidRequest) {
      return this.integration.validateBidRequest(bidRequest, this.userConfig.params, this.context);
    }

    return bidRequest;
  }
}
