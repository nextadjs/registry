import { loadBidder } from "@/bidder";
import { bidderRegistry } from "@/index";
import config from "./bidder.json";

bidderRegistry.register(config.name, (runtime) =>
  loadBidder(config.name, runtime)
);
