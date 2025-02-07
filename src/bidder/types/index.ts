import type { Runtime } from "@/types";
import type { OpenRTBVersion, V26BidRequest } from "@/types/openrtb";

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
  }
};

export interface IBidderDecorator<Req, Res> {
  decorateRequest(request: Req): Promise<Req>;
  decorateResponse(response: Res): Promise<Res>;
}

export type BidderSpec = BidderModule;

export type BidderModule = {
  v26: IBidderDecorator<V26BidRequest, V26BidRequest>;
};