import type { BuyerComplianceSpec } from "@/compliance/types";
import type { ClientSignalSpec, ServerSignalSpec } from "@/signal/types";
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

export type BuyerSpec = ClientBuyerSpec | ServerBuyerSpec;

export interface ClientBuyerSpec<
  TParams extends DefaultParams = DefaultParams
> {
  signals?: ClientBuyerSignal<TParams>[];
  compliances?: ClientBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, V26BidRequest>;
  site?: BuyerMediaContextSpec<TParams, V26SiteContextBidRequest>;
  app?: BuyerMediaContextSpec<TParams, V26AppContextBidRequest>;
  dooh?: BuyerMediaContextSpec<TParams, V26DoohContextBidRequest>;
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
  TV26BidRequest extends V26BidRequest
> {
  v26: BuyerOpenRTB2Spec<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TParams
  >;
}

export interface BuyerMediaContextSpec<
  TParams extends DefaultParams,
  TV26BidRequest extends V26BidRequest
> {
  signals?: ClientBuyerSignal<TParams>[];
  compliances?: ClientBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, TV26BidRequest>;
}

export interface ServerBuyerSpec<
  TParams extends DefaultParams = DefaultParams
> {
  signals?: ServerBuyerSignal<TParams>[];
  compliances?: ServerBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, V26BidRequest>;
  site?: BuyerMediaContextSpec<TParams, V26SiteContextBidRequest>;
  app?: BuyerMediaContextSpec<TParams, V26AppContextBidRequest>;
  dooh?: BuyerMediaContextSpec<TParams, V26DoohContextBidRequest>;
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
  TParams extends DefaultParams
> {
  configureRequestDetails(
    params: TParams,
    context: AdCOMContext
  ): RequestDetails;
  decorateBidRequest?(
    request: TReq,
    params: TParams,
    context: AdCOMContext
  ): Promise<TReq>;
  decorateImpression?(
    impression: TImp,
    params: TParams,
    context: AdCOMContext
  ): Promise<TImp>;
  decorateBidResponse?(
    response: TRes,
    params: TParams,
    context: AdCOMContext
  ): Promise<TRes>;
  decorateBid?(
    bid: TBid,
    params: TParams,
    context: AdCOMContext
  ): Promise<TBid>;
}

export interface RequestDetails {
  url: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
}
