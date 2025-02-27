import type {
  AdCOMApp,
  AdCOMContext,
  AdCOMContextWithApp,
  AdCOMContextWithDooh,
  AdCOMContextWithSite,
  AdCOMDevice,
  AdCOMDooh,
  AdCOMRegs,
  AdCOMRestrictions,
  AdCOMSite,
  AdCOMUser,
} from "@/types/adcom";
import type { ComplianceOpenRTBIntegration } from "./openrtb";
import type { DefaultParams } from "@/types";

export interface ComplianceClientContextIntegration<T extends DefaultParams> {
  site?: {
    openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithSite>;
  };
  app?: {
    openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithApp>;
  };
  dooh?: {
    openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithDooh>;
  };
  validateSite(
    site: AdCOMSite,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMSite>;
  validateApp(
    app: AdCOMApp,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMApp>;
  validateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMDooh>;
  validateUser(
    user: AdCOMUser,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMUser>;
  validateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  validateRegs(
    regs: AdCOMRegs,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMRegs>;
  validateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}

export interface ComplianceServerContextIntegration<T extends DefaultParams> {
  site?: {
    openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithSite>;
  };
  app?: {
    openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithApp>;
  };
  dooh?: {
    openrtb: ComplianceOpenRTBIntegration<T, AdCOMContextWithDooh>;
  };
  validateSite(
    site: AdCOMSite,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMSite>;
  validateApp(
    app: AdCOMApp,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMApp>;
  validateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMDooh>;
  validateUser(
    user: AdCOMUser,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMUser>;
  validateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  validateRegs(
    regs: AdCOMRegs,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMRegs>;
  validateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}
