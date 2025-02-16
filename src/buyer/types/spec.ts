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

export type ClientBuyerSpec<TParams extends DefaultParams = DefaultParams> = {
  signals?: ClientBuyerSignal<TParams>[];
  compliances?: ClientBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, V26BidRequest>;
  site?: MediaContextSpec<TParams, V26SiteContextBidRequest>;
  app?: MediaContextSpec<TParams, V26AppContextBidRequest>;
  dooh?: MediaContextSpec<TParams, V26DoohContextBidRequest>;
};

export type ClientBuyerSignal<TParams extends DefaultParams> = {
  name: string;
  spec: ClientSignalSpec<TParams, unknown>;
};

export type ClientBuyerCompliance<TParams extends DefaultParams> = {
  name: string;
  spec: BuyerComplianceSpec<TParams>;
};

export type BuyerOpenRTBSpec<
  TParams extends DefaultParams,
  TV26BidRequest extends V26BidRequest
> = {
  v26: BuyerOpenRTB2Spec<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TParams
  >;
};

export type MediaContextSpec<
  TParams extends DefaultParams,
  TV26BidRequest extends V26BidRequest
> = {
  signals?: ClientBuyerSignal<TParams>[];
  compliances?: ClientBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, TV26BidRequest>;
};

export type ServerBuyerSpec<TParams extends DefaultParams = DefaultParams> = {
  signals?: ServerBuyerSignal<TParams>[];
  compliances?: ServerBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpec<TParams, V26BidRequest>;
  site?: MediaContextSpec<TParams, V26SiteContextBidRequest>;
  app?: MediaContextSpec<TParams, V26AppContextBidRequest>;
  dooh?: MediaContextSpec<TParams, V26DoohContextBidRequest>;
};

export type ServerBuyerSignal<TParams extends DefaultParams> = {
  name: string;
  spec: ServerSignalSpec<TParams, unknown>;
};

export type ServerBuyerCompliance<TParams extends DefaultParams> = {
  name: string;
  spec: BuyerComplianceSpec<TParams>;
};
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

export type RequestDetails = {
  url: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
};
