import type { ScriptLoader } from "@/core/script-loader";
import type { EventEmitter } from "./event-emitter";
import type { MeasurementConfig } from "./types";
import type { MeasurementEventMap, MeasurementEventType } from "./types/event";

export class Measurement {
  public constructor(
    private readonly _config: MeasurementConfig,
    private readonly eventEmitter: EventEmitter,
    private readonly scriptLoader: ScriptLoader
  ) {}

  public get config(): MeasurementConfig {
    return this._config;
  }

  public on<T extends MeasurementEventType>(
    eventType: T,
    callbackFn: (data: MeasurementEventMap[T]) => void
  ) {
    this.eventEmitter.addEventListener(eventType, callbackFn);
  }

  public off<T extends MeasurementEventType>(
    eventType: T,
    callbackFn: (data: MeasurementEventMap[T]) => void
  ) {
    this.eventEmitter.addEventListener(eventType, callbackFn);
  }

  public async registerThirdPartyScript(
    url: string,
    callbackFn: () => Promise<void> | void
  ) {
    this.on("client:DOMContentLoaded", async () => {
      try {
        await this.scriptLoader.load(url);
        // TODO: サードパーティ関係のイベント発火
        await callbackFn();
        // TODO: サードパーティ関係のコールバック済みイベント発火
      } catch (error) {
        // TODO: エラーハンドリング
      }
    });
  }
}
