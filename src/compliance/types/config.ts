import type {
  Channel,
  DefaultParams,
  Runtime,
  TradeMethod,
  UserConfig,
} from "@/types";
import type { OpenRTBVersion } from "@/types/openrtb";
import type { ComplianceType } from ".";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export interface ComplianceConfig {
  name: string;
  type: ComplianceType;
  capabilities: ComplianceCapabilities;
}

export interface ComplianceCapabilities {
  runtime: Runtime[];
  context: {
    supported_channel: Channel[];
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

export interface ComplianceUserConfig<T extends DefaultParams = DefaultParams>
  extends UserConfig {
  params: T;
}
