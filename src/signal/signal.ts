import type {
  BaseAsyncCollect,
  AsyncCollect,
  SignalConfig,
  SignalMetadata,
  SignalSpec,
} from "./types";
import type { DefaultParams } from "@/types";

export abstract class Signal<
  TAsyncCollect extends BaseAsyncCollect = AsyncCollect,
  TData = unknown,
  TParams extends DefaultParams = DefaultParams
> {
  private _metadata: SignalMetadata;

  public constructor(
    private readonly _config: SignalConfig,
    private readonly _spec: SignalSpec<TAsyncCollect, TData, TParams>
  ) {
    this._metadata = {
      name: _config.name,
      status: "pending",
      lastUpdated: Date.now(),
    };
  }

  public get config(): SignalConfig {
    return this._config;
  }

  public get metadata(): SignalMetadata {
    return {
      ...this._metadata,
    };
  }

  public get spec(): SignalSpec<TAsyncCollect, TData, TParams> {
    return this._spec;
  }
}
