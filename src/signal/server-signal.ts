import type { DefaultParams, TradeMethod } from "@/types";
import type {
  SignalServerIntegration,
  SignalConfig,
  SignalUserConfig,
  ServerAsyncCollect,
} from "./types";
import type { Context } from "@/types";
import { TradeHandlerFactory } from "./handlers/factory";

export class ServerSignal<D, P extends DefaultParams> {
  private tradeHandlerFactory: TradeHandlerFactory<D, P>;
  private data!: D;
  private asyncCollections: ServerAsyncCollect[] = [];

  public constructor(
    public readonly config: SignalConfig,
    public readonly userConfig: SignalUserConfig<P>,
    public readonly context: Context,
    private readonly integration: SignalServerIntegration<D, P>
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<D, P>(integration);
  }

  public getAsyncCollections(): ServerAsyncCollect[] {
    return this.asyncCollections;
  }

  public async initialize() {
    // TODO: Error handling
    const result = await this.integration.collect();
    this.data = result.data;
    this.asyncCollections = result.asyncCollections.map((asyncCollection) => ({
      status: false,
      ...asyncCollection,
    }));
  }

  public handleTrade(tradeMethod: TradeMethod) {
    switch (tradeMethod) {
      case "OpenRTB v2.6":
        return this.handleOpenRTBv26();
    }
  }

  public handleOpenRTBv26() {
    return this.tradeHandlerFactory.createOpenRTBv26(
      this.data,
      this.userConfig,
      this.context
    );
  }

  public handleContext() {
    return this.tradeHandlerFactory.createContext(
      this.data,
      this.userConfig,
      this.context
    );
  }
}
