import type { BuyerComplianceSpec } from "@/compliance/types";
import type { ClientSignalSpec, ServerSignalSpec } from "@/signal/types";
import type { Context, DefaultParams, Runtime } from "@/types";
import type {
  OpenRTBVersion,
  V26Bid,
  V26BidRequest,
  V26Imp,
} from "@/types/openrtb";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export type BuyerConfig = {
  name: string;
  capabilities: BuyerCapabilities;
};

export type BuyerCapabilities = {
  runtime: Runtime[];
  context: Context[];
  openrtb: {
    supported_version: OpenRTBVersion[];
    supported_media: {
      banner: boolean;
      video: boolean;
      native: boolean;
      audio: boolean;
      multi_format: boolean;
    };
  };
};

export type RequestDetails = {
  url: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
};

export type BuyerSpec = ClientBuyerSpec | ServerBuyerSpec;

export type ClientBuyerSpec<TParams extends DefaultParams = DefaultParams> = {
  signals?: {
    name: string;
    spec: ClientSignalSpec<TParams, unknown>;
  }[];
  compliances?: {
    name: string;
    spec: BuyerComplianceSpec<TParams>;
  }[];
  openrtb?: {
    v26: BuyerOpenRTB2Spec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      TParams
    >;
  };
};

export type ServerBuyerSpec<TParams extends DefaultParams = DefaultParams> = {
  signals: {
    name: string;
    spec: ServerSignalSpec<TParams, unknown>;
  }[];
  compliances?: {
    name: string;
    spec: BuyerComplianceSpec;
  }[];
  openrtb?: {
    v26?: BuyerOpenRTB2Spec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      TParams
    >;
  };
};

export interface BuyerOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TParams extends DefaultParams
> {
  configureRequestDetails(params: TParams): RequestDetails;
  decorateBidRequest?(request: TReq, params: TParams): Promise<TReq>;
  decorateImpression?(impression: TImp, params: TParams): Promise<TImp>;
  decorateBidResponse?(response: TRes, params: TParams): Promise<TRes>;
  decorateBid?(bid: TBid, params: TParams): Promise<TBid>;
}
