import type { DefaultParams } from "@/types";
import type { Context as AdCOMContext } from "iab-adcom/context";
import type {
  V26AppContextBidRequest,
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26DoohContextBidRequest,
  V26Imp,
  V26SiteContextBidRequest,
} from "@/types/openrtb";

export interface ClientSignalSpec<
  TParams extends DefaultParams = DefaultParams,
  TData = unknown,
  TContext extends AdCOMContext = AdCOMContext
> extends SignalSpec<ClientAsyncCollect, TData, TParams, TContext> {}

export interface ServerSignalSpec<
  TParams extends DefaultParams = DefaultParams,
  TData = unknown,
  TContext extends AdCOMContext = AdCOMContext
> extends SignalSpec<ServerAsyncCollect, TData, TParams, TContext> {}

export interface SignalSpec<
  TAsyncCollect extends BaseAsyncCollect,
  TData = unknown,
  TParams extends DefaultParams = DefaultParams,
  TContext extends AdCOMContext = AdCOMContext
> {
  collect: SignalCollect<TAsyncCollect, TData, TParams, TContext>;
  openrtb?: SignalOpenRTBSpec<TParams, TData, TContext, V26BidRequest>;
  site?: SignalMediaContextSpec<
    TAsyncCollect,
    TData,
    TParams,
    TContext,
    V26SiteContextBidRequest
  >;
  app?: SignalMediaContextSpec<
    TAsyncCollect,
    TData,
    TParams,
    TContext,
    V26AppContextBidRequest
  >;
  dooh?: SignalMediaContextSpec<
    TAsyncCollect,
    TData,
    TParams,
    TContext,
    V26DoohContextBidRequest
  >;
}

export interface SignalMediaContextSpec<
  TAsyncCollect extends BaseAsyncCollect,
  TData,
  TParams extends DefaultParams,
  TContext extends AdCOMContext,
  TV26BidRequest extends V26BidRequest
> {
  collect: SignalCollect<TAsyncCollect, TData, TParams, TContext>;
  openrtb?: SignalOpenRTBSpec<TParams, TData, TContext, TV26BidRequest>;
}

export type SignalCollect<
  TAsyncCollect extends BaseAsyncCollect,
  TData = unknown,
  TParams extends DefaultParams = DefaultParams,
  TContext extends AdCOMContext = AdCOMContext
> = (
  params: TParams,
  context: TContext
) => Promise<CollectResult<TData, TAsyncCollect>>;

export type SignalOpenRTBSpec<
  TParams extends DefaultParams,
  TData,
  TContext extends AdCOMContext,
  TV26BidRequest extends V26BidRequest
> = {
  v26: SignalOpenRTB2Spec<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TParams,
    TData,
    TContext
  >;
};

export type CollectResult<T, TAsyncCollect> = {
  data: T;
  asyncCollections: Omit<TAsyncCollect, "status">[];
};

export interface SignalOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TParams extends DefaultParams,
  TData,
  TContext extends AdCOMContext
> {
  decorateBidRequest?(
    request: TReq,
    params: TParams,
    data: TData,
    context: TContext
  ): Promise<TReq>;
  decorateImpression?(
    impression: TImp,
    params: TParams,
    data: TData,
    context: TContext
  ): Promise<TImp>;
  decorateBidResponse?(
    response: TRes,
    params: TParams,
    data: TData,
    context: TContext
  ): Promise<TRes>;
  decorateBid?(
    bid: TBid,
    params: TParams,
    data: TData,
    context: TContext
  ): Promise<TBid>;
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
