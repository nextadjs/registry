import type {
  Channel,
  DefaultParams,
  Runtime,
  TradeMethod,
  UserConfig,
} from "@/types";
import type { OpenRTBVersion } from "@/types/openrtb";
import type { SignalType } from ".";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export interface SignalConfig {
  name: string;
  type: SignalType;
  capabilities: SignalCapabilities;
}

export interface SignalCapabilities {
  runtime: Runtime[];
  context: {
    channel: Channel[];
  },
  trade: {
    supported_method: TradeMethod[];
    openrtb?: {
      supported_version: OpenRTBVersion[];
      supported_media: {
        banner: boolean;
        video: boolean;
        native: boolean;
        audio: boolean;
      };
    };
  };
}

export interface SignalUserConfig<T extends DefaultParams = DefaultParams>
  extends UserConfig {
  params: T;
}
