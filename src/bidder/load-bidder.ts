import type { Runtime } from "@/types";
import type { BidderSpec } from "./types";

export const loadBidder = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  const spec = (await import(`@bidders/${name}/${runtime}`)) as BidderSpec;
  const config = await import(`@bidders/${name}/bidder.json`);
  const modules = spec;
  return {
    config: config,
    modules: modules,
  };
};
