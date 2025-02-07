import type { Runtime } from "@/types";
import type { V26BidRequest } from "@/types/openrtb";

export type BidderRuntime = "client" | "server";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export type BidderConfig = {
  name: string;
  runtime: Runtime[];
};

export interface IBidderDecorator<Req, Res> {
  decorateRequest(request: Req): Promise<Req>;
  decorateResponse(response: Res): Promise<Res>;
}

export type BidderSpec = BidderModule;

export type BidderModule = {
  v26: IBidderDecorator<V26BidRequest, V26BidRequest>;
};

export interface Bidder {
  config: BidderConfig;
  modules: BidderModule;
}
