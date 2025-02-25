import type { BuyerSpecWrapper } from "./types/spec-wrapper";
import type { BuyerConfig, BuyerSpec, BuyerUserConfig } from "./types";
import type { DefaultParams } from "@/types";

export abstract class Buyer<
  TParams extends DefaultParams,
  TBuyerSpec extends BuyerSpec,
  TBuyerSpecWrapper extends BuyerSpecWrapper<TBuyerSpec>
> {
  protected abstract specWrapper: TBuyerSpecWrapper;

  public constructor(
    protected readonly _config: BuyerConfig,
    protected readonly _userConfig: BuyerUserConfig<TParams>,
    _spec: TBuyerSpec
  ) {}

  public get config(): BuyerConfig {
    return this._config;
  }

  public get userConfig(): BuyerUserConfig<TParams> {
    return this._userConfig;
  }

  public get spec(): TBuyerSpecWrapper {
    return this.specWrapper;
  }
}
