import type { Context, DefaultParams } from "@/types";
import type {
  AsyncCollect,
  SignalConfig,
  SignalIntegration,
  SignalUserConfig,
} from "./types";
import { TradeHandlerFactory } from "./handlers/factory";
export abstract class Signal<
  D,
  A extends AsyncCollect,
  I extends SignalIntegration<D, P>,
  P extends DefaultParams
> {
  protected data!: D;
  protected asyncCollections: A[] = [];
  protected tradeHandlerFactory: TradeHandlerFactory<D, P>;

  public constructor(
    public readonly config: SignalConfig,
    public readonly userConfig: SignalUserConfig<P>,
    public readonly context: Context,
    protected readonly integration: I
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<D, P>(integration);
  }

  public getAsyncCollections(): A[] {
    return this.asyncCollections;
  }

  public async initialize() {
    // TODO: Error handling
    const result = await this.integration.collect();
    this.data = result.data;
    this.asyncCollections = result.asyncCollections.map((asyncCollection) => ({
      status: false,
      ...asyncCollection,
    })) as A[];
  }
}
