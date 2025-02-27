import type { DefaultParams } from "@/types";
import type { Context } from "@/types";
import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
  V26SeatBid,
} from "@/types/openrtb";

export interface ComplianceOpenRTBIntegration<
  P extends DefaultParams,
  C extends Context
> {
  v26?: ComplianceOpenRTB26Integration<P, C>;
}

export interface ComplianceOpenRTB26Integration<
  P extends DefaultParams,
  C extends Context
> {
  validateBidRequest?(
    bidRequest: Omit<V26BidRequest, "imp">,
    params: P,
    context: C
  ): Promise<Omit<V26BidRequest, "imp">>;
  validateBidResponse?(
    bidResponse: Omit<V26BidResponse, "seatbid">,
    bidRequest: V26BidRequest,
    params: P,
    context: C
  ): Promise<Omit<V26BidResponse, "seatbid">>;
  validateImpression?(
    impression: V26Imp,
    bidRequest: V26BidRequest,
    params: P,
    context: C
  ): Promise<V26Imp>;
  validateSeatBid?(
    seatBid: Omit<V26SeatBid, "bid">,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: P,
    context: C
  ): Promise<Omit<V26SeatBid, "bid">>;
  validateBid?(
    bid: V26Bid,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: P,
    context: C
  ): Promise<V26Bid>;
}
