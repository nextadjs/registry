// TODO: JSON Schemaで型補完

import type { DefaultParams, Runtime, UserConfig } from "@/types";

// TODO: version関係の整え
export type MeasurementConfig = {
  name: string;
  capabilities: MeasurementCapabilities;
};

export type MeasurementCapabilities = {};

export interface MeasurementUserConfig<T extends DefaultParams = DefaultParams>
  extends UserConfig {
  runtime: Runtime;
  params: T;
}
