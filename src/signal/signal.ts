import type { V26BidRequest } from "@/types/openrtb";
import type {
  AsyncCollectionMethod,
  SignalConfig,
  SignalMetadata,
} from "./types";

export abstract class Signal<T = void, TOptions = Record<string, unknown>> {
  private readonly _name: string;
  private _asyncCollections: AsyncCollectionMethod[];
  private _metadata: SignalMetadata;
  protected _data: T | null = null;

  public constructor(config: SignalConfig, asyncCollections: AsyncCollectionMethod[]) {
    this._name = config.name;
    this._asyncCollections = asyncCollections;
    this._metadata = {
      name: this.name,
      config: config,
      status: "pending",
    };
  }

  public get name(): string {
    return this._name;
  }

  public get metadata(): SignalMetadata {
    return {
      ...this._metadata,
      lastUpdated: Date.now(),
    };
  }

  public get asyncCollections(): AsyncCollectionMethod[] {
    return this._asyncCollections;
  }

  protected set asyncCollections(asyncCollections: AsyncCollectionMethod[]) {
    this._asyncCollections = asyncCollections;
  }

  public async initialize(options: TOptions): Promise<void> {
    try {
      this._data = await this.collect(options);
      this.active();
    } catch (error) {
      this.error();
      throw error;
    }
  }

  // フリークエンシーとかキャッシュとかのオプション？ヘルパー？用意してあげると便利そう
  public abstract collect(options: TOptions): Promise<T>;

  protected scheduleAsyncCollection(
    type: AsyncCollectionMethod["type"],
    config: AsyncCollectionMethod["config"]
  ) {
    this.asyncCollections.push({
      type: type,
      status: false,
      config: config,
    });
  }

  abstract decorateV26BidRequest(
    request: V26BidRequest
  ): Promise<V26BidRequest>;

  private active() {
    this._metadata = {
      ...this._metadata,
      status: "active",
    };
  }

  private error() {
    this._metadata = {
      ...this._metadata,
      status: "error",
    };
  }
}
