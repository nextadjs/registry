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

export interface ComplianceUserConfig<T extends DefaultParams = DefaultParams>
  extends UserConfig {
  runtime: Runtime;
  params: T;
}
