import type { DefaultParams, TradeMethod } from "@/types";
import type {
  ClientAsyncCollect,
  SignalClientIntegration,
  SignalConfig,
  SignalUserConfig,
} from "./types";
import type { Context } from "@/types";
import { TradeHandlerFactory } from "./handlers/factory";

export class ClientSignal<D, P extends DefaultParams> {
  private tradeHandlerFactory: TradeHandlerFactory<D, P>;
  private data!: D;
  private asyncCollections: ClientAsyncCollect[] = [];

  public constructor(
    public readonly config: SignalConfig,
    public readonly userConfig: SignalUserConfig<P>,
    public readonly context: Context,
    private readonly integration: SignalClientIntegration<D, P>
  ) {
    this.tradeHandlerFactory = new TradeHandlerFactory<D, P>(integration);
  }

  public getAsyncCollections(): ClientAsyncCollect[] {
    return this.asyncCollections;
  }

  public async initialize() {
    // TODO: Error handling
    const result = await this.integration.collect();
    this.data = result.data;
    this.asyncCollections = result.asyncCollections.map((asyncCollection) => ({
      status: false,
      ...asyncCollection,
    })) as ClientAsyncCollect[];
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
