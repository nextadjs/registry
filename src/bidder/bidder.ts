import type { BidderConfig, BidderSpec } from "./types";

export class Bidder {
  public constructor(
    private readonly _config: BidderConfig,
    private readonly _spec: BidderSpec
  ) {}

  public get config(): BidderConfig {
    return this._config;
  }

  public get spec(): BidderSpec {
    return this._spec;
  }
}
