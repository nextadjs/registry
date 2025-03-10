import type {
  Channel,
  DefaultParams,
  Mode,
  Runtime,
  TradeMethod,
  UserConfig,
} from "@/types";
import type { OpenRTBVersion } from "@/types/openrtb";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export interface BuyerConfig {
  name: string;
  capabilities: BuyerCapabilities;
}

export interface BuyerCapabilities {
  runtime: Runtime[];
  mode: Mode[];
  context: {
    channel: Channel[];
  };
  trade: {
    method: TradeMethod[];
    openrtbV26: {
      supported_media: {
        multi_format?: boolean;
        banner?: boolean;
        video?: boolean;
        native?: boolean;
        audio?: boolean;
      };
    };
  };
}

export interface BuyerUserConfig<T extends DefaultParams = DefaultParams>
  extends UserConfig {
  runtime: Runtime;
  params: T;
}
