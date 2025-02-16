import type { Context, Runtime } from "@/types";
import type { OpenRTBVersion } from "@/types/openrtb";

// TODO: JSON Schemaで型補完
// TODO: version関係の整え
export type BuyerConfig = {
  name: string;
  capabilities: BuyerCapabilities;
};

export type BuyerCapabilities = {
  runtime: Runtime[];
  context: Context[];
  openrtb: {
    supported_version: OpenRTBVersion[];
    supported_media: {
      banner: boolean;
      video: boolean;
      native: boolean;
      audio: boolean;
    };
  };
};
