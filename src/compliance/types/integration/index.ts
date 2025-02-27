import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type { ComplianceOpenRTBIntegration } from "./openrtb";
import type {
  ComplianceClientContextIntegration,
  ComplianceServerContextIntegration,
} from "./context";

export type ComplianceIntegration<T extends DefaultParams> =
  | ComplianceClientIntegration<T>
  | ComplianceServerIntegration<T>;

export interface ComplianceClientIntegration<T extends DefaultParams> {
  openrtb?: ComplianceOpenRTBIntegration<T, Context>;
  context?: ComplianceClientContextIntegration<T>;
}

export interface ComplianceServerIntegration<T extends DefaultParams> {
  openrtb?: ComplianceOpenRTBIntegration<T, Context>;
  context?: ComplianceServerContextIntegration<T>;
}

export * from "./openrtb";
export * from './context';