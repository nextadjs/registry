import type { BuyerComplianceSpec } from "@/compliance/types";
import type { ClientSignalSpec, ServerSignalSpec } from "@/signal/types";
import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type {
  V26AppContextBidRequest,
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26DoohContextBidRequest,
  V26Imp,
  V26SiteContextBidRequest,
} from "@/types/openrtb";
import type {
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
} from "@/types/adcom";

export type BuyerSpec = ClientBuyerSpec | ServerBuyerSpec;

export interface ClientBuyerSpec<
  TParams extends DefaultParams = DefaultParams
> {
  signals?: ClientBuyerSignal<TParams>[];
  compliances?: ClientBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, AdCOMContext, V26BidRequest>;
  site?: BuyerMediaContextSpec<
    TParams,
    ContextWithSite,
    V26SiteContextBidRequest
  >;
  app?: BuyerMediaContextSpec<TParams, ContextWithApp, V26AppContextBidRequest>;
  dooh?: BuyerMediaContextSpec<
    TParams,
    ContextWithDooh,
    V26DoohContextBidRequest
  >;
}

export interface ClientBuyerSignal<TParams extends DefaultParams> {
  name: string;
  spec: ClientSignalSpec<TParams, unknown>;
}

export interface ClientBuyerCompliance<TParams extends DefaultParams> {
  name: string;
  spec: BuyerComplianceSpec<TParams>;
}

export interface BuyerOpenRTBSpec<
  TParams extends DefaultParams,
  TContext extends AdCOMContext,
  TV26BidRequest extends V26BidRequest
> {
  v26: BuyerOpenRTB2Spec<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TParams,
    TContext
  >;
}

export interface BuyerMediaContextSpec<
  TParams extends DefaultParams,
  TContext extends AdCOMContext,
  TV26BidRequest extends V26BidRequest
> {
  signals?: ClientBuyerSignal<TParams>[];
  compliances?: ClientBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, TContext, TV26BidRequest>;
}

export interface ServerBuyerSpec<
  TParams extends DefaultParams = DefaultParams
> {
  signals?: ServerBuyerSignal<TParams>[];
  compliances?: ServerBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, AdCOMContext, V26BidRequest>;
  site?: BuyerMediaContextSpec<
    TParams,
    ContextWithSite,
    V26SiteContextBidRequest
  >;
  app?: BuyerMediaContextSpec<TParams, ContextWithApp, V26AppContextBidRequest>;
  dooh?: BuyerMediaContextSpec<
    TParams,
    ContextWithDooh,
    V26DoohContextBidRequest
  >;
}

export interface ServerBuyerSignal<TParams extends DefaultParams> {
  name: string;
  spec: ServerSignalSpec<TParams, unknown>;
}

export interface ServerBuyerCompliance<TParams extends DefaultParams> {
  name: string;
  spec: BuyerComplianceSpec<TParams>;
}

export interface BuyerOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TParams extends DefaultParams,
  TContext extends AdCOMContext
> {
  configureRequestDetails(params: TParams, context: TContext): RequestDetails;
  decorateBidRequest?(
    request: TReq,
    params: TParams,
    context: TContext
  ): Promise<TReq>;
  decorateImpression?(
    impression: TImp,
    params: TParams,
    context: TContext
  ): Promise<TImp>;
  decorateBidResponse?(
    response: TRes,
    params: TParams,
    context: TContext
  ): Promise<TRes>;
  decorateBid?(bid: TBid, params: TParams, context: TContext): Promise<TBid>;
}

export interface RequestDetails {
  url: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
}
