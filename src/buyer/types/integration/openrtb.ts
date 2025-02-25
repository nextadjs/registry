import type { DefaultParams } from "@/types";
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
  T1 extends DefaultParams,
  T2 extends AdCOMContext
> {
  v26?: BuyerOpenRTB26Integration<T1, T2>;
}

export interface BuyerOpenRTB26Integration<
  T1 extends DefaultParams,
  T2 extends AdCOMContext
> {
  configureRequest(params: T1, context: T2): OpenRTBRequestConfig;
  decorateBidRequest?(
    bidRequest: Omit<V26BidRequest, "imp">,
    params: T1,
    context: T2
  ): Omit<V26BidRequest, "imp">;
  decorateBidResponse?(
    bidResponse: Omit<V26BidResponse, "seatbid">,
    bidRequest: V26BidRequest,
    params: T1,
    context: T2
  ): Omit<V26BidResponse, "seatbid">;
  decorateImpression?(
    impression: V26Imp,
    bidRequest: V26BidRequest,
    params: T1,
    context: T2
  ): V26Imp;
  decorateSeatBid?(
    seatBid: Omit<V26SeatBid, "bid">,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: T1,
    context: T2
  ): Omit<V26SeatBid, "bid">;
  decorateBid?(
    bid: V26Bid,
    bidRequest: V26BidRequest,
    bidResponse: V26BidResponse,
    params: T1,
    context: T2
  ): V26Bid;
}
