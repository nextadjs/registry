import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type {
  ComplianceClientChannelIntegration,
  ComplianceServerChannelIntegration,
} from "./channel";
import type { ComplianceOpenRTB26Integration } from "./openrtb";

export type ComplianceIntegration<T extends DefaultParams> =
  | ComplianceClientIntegration<T>
  | ComplianceServerIntegration<T>;

export interface ComplianceClientIntegration<T extends DefaultParams> {
  openrtbV26?: ComplianceOpenRTB26Integration<T, Context>;
  channel?: ComplianceClientChannelIntegration<T>;
}

export interface ComplianceServerIntegration<T extends DefaultParams> {
  openrtbV26?: ComplianceOpenRTB26Integration<T, Context>;
  channel?: ComplianceServerChannelIntegration<T>;
}

export * from "./openrtb";
export * from './channel';