import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type {
  ComplianceClientContextIntegration,
  ComplianceServerContextIntegration,
} from "./context";
import type { ComplianceOpenRTB26Integration } from "./openrtb";

export type ComplianceIntegration<T extends DefaultParams> =
  | ComplianceClientIntegration<T>
  | ComplianceServerIntegration<T>;

export interface ComplianceClientIntegration<T extends DefaultParams> {
  openrtbV26?: ComplianceOpenRTB26Integration<T, Context>;
  context?: ComplianceClientContextIntegration<T>;
}

export interface ComplianceServerIntegration<T extends DefaultParams> {
  openrtbV26?: ComplianceOpenRTB26Integration<T, Context>;
  context?: ComplianceServerContextIntegration<T>;
}

export * from "./openrtb";
export * from './context';