import type { BuyerConfig, BuyerSpec } from "./types";

export class Buyer<TBuyerSpec = BuyerSpec> {
  public constructor(
    private readonly _config: BuyerConfig,
    private readonly _spec: TBuyerSpec
  ) {}

  public get config(): BuyerConfig {
    return this._config;
  }

  public get spec(): TBuyerSpec {
    return this._spec;
  }
}
