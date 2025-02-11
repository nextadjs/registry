import type { CustomParams, Runtime } from "@/types";
import type {
  OpenRTBVersion,
  V26Bid,
  V26BidRequest,
  V26Imp,
} from "@/types/openrtb";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export type BidderConfig = {
  name: string;
  capabilities: BidderCapabilities;
};

export type BidderCapabilities = {
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
  endpoint: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
};

export interface BidderOpenRTBSpec<TReq, TImp, TRes, TBid, TCustomParams> {
  configureRequestDetails(params: TCustomParams): RequestDetails;
  decorateBidRequest?(request: TReq, params: TCustomParams): Promise<TReq>;
  decorateImpression?(impression: TImp, params: TCustomParams): Promise<TImp>;
  decorateBidResponse?(response: TRes, params: TCustomParams): Promise<TRes>;
  decorateBid?(bid: TBid, params: TCustomParams): Promise<TBid>;
}

export type BidderSpec = {
  openrtb: {
    v26: BidderOpenRTBSpec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      CustomParams
    >;
  };
};
