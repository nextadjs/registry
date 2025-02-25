// TODO: Signal, Compliance Wrapper作成時に変更する
import type { BuyerComplianceSpec } from "@/compliance/types";
import type { ClientSignal, ClientSignalSpecWrapper, ServerSignalSpecWrapper } from "@/signal";
import type { ClientSignalSpec, ServerSignalSpec} from "@/signal/types";
import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
} from "@/types/openrtb";

export type BuyerSpecWrapper<TParams extends DefaultParams> = ClientBuyerSpecWrapper<TParams> | ServerBuyerSpecWrapper<TParams>;

export interface ClientBuyerSpecWrapper<
  TParams extends DefaultParams = DefaultParams
> {
  signals(): ClientSignal[];
  compliances(): ClientBuyerComplianceWrap<TParams>[];
  openrtb(context: AdCOMContext): BuyerOpenRTBSpecWrapper<V26BidRequest>;
}

export interface ClientBuyerSignalWrap<TParams extends DefaultParams> {
  name: string;
  spec: ClientSignalSpecWrapper<TParams, unknown>;
}

export interface ClientBuyerComplianceWrap<TParams extends DefaultParams> {  
  name: string;
  spec: BuyerComplianceSpec<TParams>;
}

export interface BuyerOpenRTBSpecWrapper<
  TV26BidRequest extends V26BidRequest
> {
  v26?: BuyerOpenRTB2SpecWrapper<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid
  >;
}

export interface ServerBuyerSpecWrapper<  
  TParams extends DefaultParams = DefaultParams
> {
  signals?: ServerBuyerSignal<TParams>[];
  compliances?: ServerBuyerCompliance<TParams>[];
  openrtb?: BuyerOpenRTBSpecWrapper< V26BidRequest>;
}

export interface ServerBuyerSignal<TParams extends DefaultParams> {
  name: string;
  spec: ServerSignalSpecWrapper<TParams, unknown>;
}

export interface ServerBuyerCompliance<TParams extends DefaultParams> {
  name: string;
  spec: BuyerComplianceSpec<TParams>;
}

export interface BuyerOpenRTB2SpecWrapper<
  TReq,
  TImp,
  TRes,
  TBid,
> {
  configureRequestDetails(): RequestDetails;
  decorateBidRequest(
    request: TReq,
  ): Promise<TReq>;
  decorateImpression(
    impression: TImp,
  ): Promise<TImp>;
  decorateBidResponse(
    response: TRes,
  ): Promise<TRes>;
  decorateBid?(bid: TBid): Promise<TBid>;
}

export interface RequestDetails {
  url: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
}
