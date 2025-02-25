import type {
  Context,
  DefaultParams,
  Runtime,
  TradeMethod,
  UserConfig,
} from "@/types";
import type { OpenRTBVersion } from "@/types/openrtb";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export interface ComplianceConfig {
  name: string;
  capabilities: ComplianceCapabilities;
}

export interface ComplianceCapabilities {
  runtime: Runtime[];
  context: Context[];
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
