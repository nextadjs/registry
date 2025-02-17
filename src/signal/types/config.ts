import type { Context, Runtime } from "@/types";
import type {
  OpenRTBVersion,
} from "@/types/openrtb";

export type SignalType = "identity" | "contextual" | "audience" | "delivery";

export type SignalConfig = {
  name: string;
  capabilities: SignalCapabilities;
};

export type SignalCapabilities = {
  type: SignalType;
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
