import type { AdCOMContext } from "@/types/adcom";
import type {
  BaseAsyncCollect,
  AsyncCollect,
  SignalConfig,
  SignalMetadata,
  SignalSpec,
  SignalUserConfig,
} from "./types";
import type { DefaultParams } from "@/types";
import type { SignalSpecWrapper } from "./types/spec-wrapper";

export abstract class Signal<
  TAsyncCollect extends BaseAsyncCollect = AsyncCollect,
  TData = unknown,
  TParams extends DefaultParams = DefaultParams
> {
  protected _metadata: SignalMetadata;
  protected _data!: TData;
  protected _asyncCollects: TAsyncCollect[];

  public constructor(
    protected readonly _config: SignalConfig,
    protected readonly _userConfig: SignalUserConfig<TParams>,
    protected readonly _spec: SignalSpec<TAsyncCollect, TData, TParams>
  ) {
    this._asyncCollects = [];
    this._metadata = {
      name: _config.name,
      status: "pending",
      lastUpdated: Date.now(),
    };
  }

  public async initialize(params: TParams, context: AdCOMContext) {
    const collectResult = await this._spec.collect(params, context);
    this._data = collectResult.data;
    this._asyncCollects = collectResult.asyncCollections.map(asyncCollection => ({
      ...asyncCollection,
      status: false,
    })) as TAsyncCollect[];
  }

  public get config(): SignalConfig {
    return this._config;
  }

  public get metadata(): SignalMetadata {
    return {
      ...this._metadata,
    };
  }

  public abstract spec(): SignalSpecWrapper<TAsyncCollect, TData>;
}

