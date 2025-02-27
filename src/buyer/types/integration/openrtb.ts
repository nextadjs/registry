import type { Context, DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
  V26SeatBid,
} from "@/types/openrtb";

export interface OpenRTBRequestConfig {
  url: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
}

export interface BuyerOpenRTBIntegration<
  P extends DefaultParams,
  C extends Context
> {
  v26?: BuyerOpenRTB26Integration<P, C>;
}

export interface BuyerOpenRTB26Integration<
  P extends DefaultParams,
  C extends Context
> {
  configureRequest(params: P, context: C): OpenRTBRequestConfig;
  decorateBidRequest?(
    bidRequest: Omit<V26BidRequest, "imp">,
    params: P,
    context: C
  ): Omit<V26BidRequest, "imp">;
  decorateBidResponse?(
    bidResponse: Omit<V26BidResponse, "seatbid">,
    bidRequest: V26BidRequest,
    params: P,
    context: C
  ): Omit<V26BidResponse, "seatbid">;
  decorateImpression?(
    impression: V26Imp,
    bidRequest: V26BidRequest,
    params: P,
    context: C
  ): V26Imp;
  decorateSeatBid?(
    seatBid: Omit<V26SeatBid, "bid">,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: P,
    context: C
  ): Omit<V26SeatBid, "bid">;
  decorateBid?(
    bid: V26Bid,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: P,
    context: C
  ): V26Bid;
}
