import type { DefaultParams, Runtime } from "@/types";
import type { V26Bid, V26BidRequest, V26Imp } from "@/types/openrtb";

export type SignalType = "identity" | "contextual" | "audience" | "delivery";

export type SignalConfig = {
  name: string;
  type: SignalType;
  runtime: Runtime[];
};

export interface ClientSignalSpec<
  TDefaultParams extends DefaultParams = DefaultParams,
  TData = unknown,
> extends SignalSpec<ClientAsyncCollect, TData, TDefaultParams> {}

export interface ServerSignalSpec<
  TDefaultParams extends DefaultParams = DefaultParams,
  TData = unknown,
> extends SignalSpec<ServerAsyncCollect, TData, TDefaultParams> {}

export interface SignalSpec<
  TAsyncCollect extends BaseAsyncCollect,
  TData = unknown,
  TDefaultParams extends DefaultParams = DefaultParams
> {
  collect: (
    params: TDefaultParams
  ) => Promise<CollectResult<TData, TAsyncCollect>>;
  openrtb: {
    v26: SignalOpenRTB2Spec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      TDefaultParams,
      TData
    >;
  };
}

export type CollectResult<T, TAsyncCollect> = {
  data: T;
  asyncCollections: TAsyncCollect[];
};

export interface SignalOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TDefaultParams extends DefaultParams,
  TData
> {
  decorateBidRequest?(
    request: TReq,
    params: TDefaultParams,
    data: TData
  ): Promise<TReq>;
  decorateImpression?(
    impression: TImp,
    params: TDefaultParams,
    data: TData
  ): Promise<TImp>;
  decorateBidResponse?(
    response: TRes,
    params: TDefaultParams,
    data: TData
  ): Promise<TRes>;
  decorateBid?(bid: TBid, params: TDefaultParams, data: TData): Promise<TBid>;
}

export type AsyncCollect = ServerAsyncCollect | ClientAsyncCollect;
export type ServerAsyncCollect = SimpleAsyncCollect;
export type ClientAsyncCollect = SimpleAsyncCollect | CustomAsyncCollect;

export interface BaseAsyncCollect {
  type: string;
  status: boolean;
  trigger: AsyncCollectTrigger;
}

export interface SimpleAsyncCollect extends BaseAsyncCollect {
  type: "iframe" | "script" | "pixel";
  timeout?: number;
  url: string;
  position?: "head" | "body";
}

export interface CustomAsyncCollect extends BaseAsyncCollect {
  type: "custom";
  handle: () => Promise<void>;
}

export type AsyncCollectTrigger =
  | "immediate"
  | "load"
  | "idle"
  | "DOMContentLoaded";
export interface SignalMetadata {
  name: string;
  status: "active" | "pending" | "error";
  lastUpdated?: number;
}
