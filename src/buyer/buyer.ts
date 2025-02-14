import type { BuyerConfig, BuyerSpec } from "./types";

export class Buyer {
  public constructor(
    private readonly _config: BuyerConfig,
    private readonly _spec: BuyerSpec
  ) {}

  public get config(): BuyerConfig {
    return this._config;
  }

  public get spec(): BuyerSpec {
    return this._spec;
  }
}
