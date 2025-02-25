import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
} from "@/types/openrtb";
import type { BaseAsyncCollect, CollectResult } from "./spec";

export interface SignalSpecWrapper<
  TAsyncCollect extends BaseAsyncCollect,
  TData = unknown
> {
}

export type SignalOpenRTBSpecWrap<
  TData,
  TV26BidRequest extends V26BidRequest
> = {
  v26?: SignalOpenRTB2SpecWrapper<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TData
  >;
};

export interface SignalOpenRTB2SpecWrapper<TReq, TImp, TRes, TBid, TData> {
  decorateBidRequest?(request: TReq, data: TData): Promise<TReq>;
  decorateImpression?(impression: TImp, data: TData): Promise<TImp>;
  decorateBidResponse?(response: TRes, data: TData): Promise<TRes>;
  decorateBid?(bid: TBid, data: TData): Promise<TBid>;
}
