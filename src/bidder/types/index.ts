import type { Runtime } from "@/types";
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

export type CustomParams = Record<string, unknown>;

export type RequestDetails = {
  endpoint: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
};

export interface OpenRTBSpec<Req, Imp, Res, Bid, CustomParams> {
  configureRequestDetails(params: CustomParams): RequestDetails;
  decorateBidRequest?(request: Req, params: CustomParams): Promise<Req>;
  decorateImpression?(impression: Imp, params: CustomParams): Promise<Imp>;
  decorateBidResponse?(response: Res, params: CustomParams): Promise<Res>;
  decorateBid?(bid: Bid, params: CustomParams): Promise<Bid>;
}

export type BidderSpec = {
  openrtb: {
    v26: OpenRTBSpec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      CustomParams
    >;
  };
};
