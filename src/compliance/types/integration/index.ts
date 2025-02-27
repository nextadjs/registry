import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
} from "@/types/adcom";
import type { ComplianceOpenRTBIntegration } from "./openrtb";
import type {
  ComplianceClientContextIntegration,
  ComplianceServerContextIntegration,
} from "./context";

export type ComplianceIntegration<T extends DefaultParams> =
  | ComplianceClientIntegration<T>
  | ComplianceServerIntegration<T>;

export interface ComplianceClientIntegration<T extends DefaultParams> {
  openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContext>;
  context?: ComplianceClientContextIntegration<T>;
}

export interface ComplianceServerIntegration<T extends DefaultParams> {
  openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContext>;
  context?: ComplianceServerContextIntegration<T>;
}

export * from "./openrtb";
export * from './context';