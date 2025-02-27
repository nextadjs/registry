import type { DefaultParams } from "@/types";
import type { Context } from "@/types";
import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
  V26SeatBid,
} from "@/types/openrtb";

export interface SignalOpenRTB26Integration<
  D,
  P extends DefaultParams,
  C extends Context
> {
  decorateBidRequest?(
    bidRequest: Omit<V26BidRequest, "imp">,
    data: D,
    params: P,
    context: C
  ): Omit<V26BidRequest, "imp">;
  decorateBidResponse?(
    bidResponse: Omit<V26BidResponse, "seatbid">,
    bidRequest: V26BidRequest,
    data: D,
    params: P,
    context: C
  ): Omit<V26BidResponse, "seatbid">;
  decorateImpression?(
    impression: V26Imp,
    bidRequest: V26BidRequest,
    data: D,
    params: P,
    context: C
  ): V26Imp;
  decorateSeatBid?(
    seatBid: Omit<V26SeatBid, "bid">,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    data: D,
    params: P,
    context: C
  ): Omit<V26SeatBid, "bid">;
  decorateBid?(
    bid: V26Bid,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    data: D,
    params: P,
    context: C
  ): V26Bid;
}
