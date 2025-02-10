export type SignalType = "identity" | "contextual" | "audience" | "delivery";

export type SignalConfig = {
  name: string;
  type: SignalType;
};

export type AsyncCollectionMethod = {
  type: "http" | "iframe" | "script" | "pixel";
  status: boolean;
  config: {
    url: string;
    trigger: "immediate" | "load" | "idle" | "DOMContentLoaded" | "custom";
    timeout?: number;
    position?: "head" | "body";
    customTrigger?: () => Promise<boolean>;
  };
};

export interface SignalMetadata {
  name: string;
  config: SignalConfig;
  status: "active" | "pending" | "error";
  lastUpdated?: number;
}
