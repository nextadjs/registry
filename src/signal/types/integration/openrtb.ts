import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
  V26SeatBid,
} from "@/types/openrtb";

export interface SignalOpenRTBIntegration<
  P extends DefaultParams,
  C extends AdCOMContext
> {
  v26?: SignalOpenRTB26Integration<P, C>;
}

export interface SignalOpenRTB26Integration<
  P extends DefaultParams,
  C extends AdCOMContext
> {
  decorateBidRequest?(
    bidRequest: Omit<V26BidRequest, "imp">,
    params: P,
    context: C
  ): Promise<Omit<V26BidRequest, "imp">>;
  decorateBidResponse?(
    bidResponse: Omit<V26BidResponse, "seatbid">,
    bidRequest: V26BidRequest,
    params: P,
    context: C
  ): Promise<Omit<V26BidResponse, "seatbid">>;
  decorateImpression?(
    impression: V26Imp,
    bidRequest: V26BidRequest,
    params: P,
    context: C
  ): Promise<V26Imp>;
  decorateSeatBid?(
    seatBid: Omit<V26SeatBid, "bid">,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: P,
    context: C
  ): Promise<Omit<V26SeatBid, "bid">>;
  decorateBid?(
    bid: V26Bid,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: P,
    context: C
  ): Promise<V26Bid>;
}
