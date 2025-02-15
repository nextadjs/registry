import type { CustomParams, Runtime } from "@/types";
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

export type BuyerSpec<TCustomParams = unknown> = {
  openrtb: {
    v26: BuyerOpenRTB2Spec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      TCustomParams
    >;
  };
};

export interface BuyerOpenRTB2Spec<TReq, TImp, TRes, TBid, TCustomParams> {
  configureRequestDetails(params: TCustomParams): RequestDetails;
  decorateBidRequest?(request: TReq, params: TCustomParams): Promise<TReq>;
  decorateImpression?(impression: TImp, params: TCustomParams): Promise<TImp>;
  decorateBidResponse?(response: TRes, params: TCustomParams): Promise<TRes>;
  decorateBid?(bid: TBid, params: TCustomParams): Promise<TBid>;
}
