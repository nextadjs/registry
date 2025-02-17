import type { ScriptLoader } from "@/core/script-loader";
import type { EventEmitter } from "./event-emitter";
import type { MeasurementConfig } from "./types";
import type { MeasurementEventMap, MeasurementEventType } from "./types/event";
import type { DefaultParams, Runtime } from "@/types";

export class Measurement<TParams extends DefaultParams = DefaultParams> {
  protected runtime: Runtime | "both" = "both";
  private params!: TParams;

  public constructor(
    private readonly _config: MeasurementConfig,
    private readonly eventEmitter: EventEmitter,
    private readonly scriptLoader: ScriptLoader
  ) {}

  public get config(): MeasurementConfig {
    return this._config;
  }

  public setParams(params: TParams): this {
    this.params = params;
    return this;
  }

  public on<T extends MeasurementEventType>(
    eventType: T,
    callbackFn: (params: TParams, data: MeasurementEventMap[T]) => void
  ) {
    this.eventEmitter.addEventListener(eventType, (data) => {
      if (this.runtime === "both" || this.runtime === data.runtime) {
        callbackFn(this.params, data);
      }
    });
  }

  public off<T extends MeasurementEventType>(
    eventType: T,
    callbackFn: (params: TParams, data: MeasurementEventMap[T]) => void
  ) {
    this.eventEmitter.removeEventListener(eventType, (data) => {
      if (this.runtime === "both" || this.runtime === data.runtime) {
        callbackFn(this.params, data);
      }
    });
  }

  // TODO: 広告枠情報を渡してあげると親切かも
  public async registerThirdPartyScript(
    url: string,
    callbackFn: (params: TParams) => Promise<void> | void
  ) {
    this.eventEmitter.addEventListener("document:DOMContentLoaded", async () => {
      try {
        await this.scriptLoader.load(url);
        // TODO: サードパーティ関係のイベント発火
        await callbackFn(this.params);
        // TODO: サードパーティ関係のコールバック済みイベント発火
      } catch (error) {
        // TODO: エラーハンドリング
      }
    });
  }
}
