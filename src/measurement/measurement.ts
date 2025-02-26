import type { DefaultParams, Runtime } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type {
  EventData,
  MeasurementConfig,
  MeasurementEvent,
  MeasurementEventType,
  MeasurementUserConfig,
} from "./types";
import type { EventEmitter } from "./event-emitter";
import type { ScriptLoader } from "@/core/script-loader";

export class Measurement<P extends DefaultParams> {
  private userConfig!: MeasurementUserConfig<P>;
  private context!: AdCOMContext;
  protected runtime: Runtime | "both" = "both";

  public constructor(
    public readonly config: MeasurementConfig,
    private readonly eventEmitter: EventEmitter,
    private readonly scriptLoader: ScriptLoader
  ) {}

  public initialize(
    userConfig: MeasurementUserConfig<P>,
    context: AdCOMContext
  ): this {
    this.userConfig = userConfig;
    this.context = context;
    return this;
  }

  public on<T extends MeasurementEventType>(
    eventType: T,
    callbackFn: (event: MeasurementEvent<EventData<T>>, params: P) => void
  ) {
    this.eventEmitter.addEventListener<T>(eventType, (event) => {
      if (this.runtime === "both" || this.runtime === event.runtime) {
        callbackFn(event, this.userConfig.params);
      }
    });
  }

  public off<T extends MeasurementEventType>(
    eventType: T,
    callbackFn: (event: MeasurementEvent<EventData<T>>, params: P) => void
  ) {
    this.eventEmitter.removeEventListener<T>(eventType, (event) => {
      if (this.runtime === "both" || this.runtime === event.runtime) {
        callbackFn(event, this.userConfig.params);
      }
    });
  }

  // TODO: 広告枠情報を渡してあげると親切かも
  public async registerThirdPartyScript(
    url: string,
    callbackFn: (params: P, context: AdCOMContext) => Promise<void> | void
  ) {
    this.eventEmitter.addEventListener(
      "document:DOMContentLoaded",
      async () => {
        try {
          await this.scriptLoader.load(url);
          // TODO: サードパーティ関係のイベント発火
          await callbackFn(this.userConfig.params, this.context);
          // TODO: サードパーティ関係のコールバック済みイベント発火
        } catch (error) {
          // TODO: エラーハンドリング
        }
      }
    );
  }
}
