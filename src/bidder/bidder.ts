import type { BidderConfig, BidderSpec } from "./types";

export class Bidder {
  public constructor(
    private _config: BidderConfig,
    private _spec: BidderSpec
  ) {}

  public get config(): BidderConfig {
    return this._config;
  }

  public get spec(): BidderSpec {
    return this._spec;
  }
}
