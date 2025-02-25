import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
  AdCOMContextWithApp,
  AdCOMContextWithDooh,
  AdCOMContextWithSite,
} from "@/types/adcom";
import type { ComplianceOpenRTBIntegration } from "./openrtb";

export type ComplianceIntegration<T extends DefaultParams> =
  ComplianceClientIntegration<T> | ComplianceServerIntegration<T>;

export interface ComplianceClientIntegration<T extends DefaultParams> {
  openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithSite>;
    };
    app?: {
      openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithApp>;
    };
    dooh?: {
      openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithDooh>;
    };
  };
}

export interface ComplianceServerIntegration<T extends DefaultParams> {
  openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContextWithSite>;
    };
    app?: {
      openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContextWithApp>;
    };
    dooh?: {
      openrtb?: ComplianceOpenRTBIntegration<T, AdCOMContextWithDooh>;
    };
  };
}

export * from "./openrtb";
