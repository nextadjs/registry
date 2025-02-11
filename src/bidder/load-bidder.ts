import type { Runtime } from "@/types";
import type { BidderSpec } from "./types";
import { Bidder } from "./bidder";

export const loadBidder = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  const spec = (await import(`@bidders/${name}/${runtime}`)).default as BidderSpec;
  const config = await import(`@bidders/${name}/bidder.json`);
  return new Bidder(config, spec);
};
