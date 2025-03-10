import type {
  AdCOMApp,
  AdCOMDevice,
  AdCOMDooh,
  AdCOMRegs,
  AdCOMRestrictions,
  AdCOMSite,
  AdCOMUser,
} from "@/types/adcom";
import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
  DefaultParams,
} from "@/types";
import type { ComplianceOpenRTB26Integration } from "./openrtb";

export interface ComplianceClientChannelIntegration<T extends DefaultParams> extends ComplianceAdCOMChannelIntegration<T> {
  site?: {
    openrtbV26?: ComplianceOpenRTB26Integration<T, ContextWithSite>;
  };
  app?: {
    openrtbV26?: ComplianceOpenRTB26Integration<T, ContextWithApp>;
  };
  dooh?: {
    openrtbV26?: ComplianceOpenRTB26Integration<T, ContextWithDooh>;
  };
}

export interface ComplianceServerChannelIntegration<T extends DefaultParams> extends ComplianceAdCOMChannelIntegration<T> {
  site?: {
    openrtbV26?: ComplianceOpenRTB26Integration<T, ContextWithSite>;
  };
  app?: {
    openrtbV26?: ComplianceOpenRTB26Integration<T, ContextWithApp>;
  };
  dooh?: {
    openrtbV26?: ComplianceOpenRTB26Integration<T, ContextWithDooh>;
  };
}

export interface ComplianceAdCOMChannelIntegration<T extends DefaultParams> {
  validateSite(
    site: AdCOMSite,
    params: T,
    context: Context
  ): Promise<AdCOMSite>;
  validateApp(app: AdCOMApp, params: T, context: Context): Promise<AdCOMApp>;
  validateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: Context
  ): Promise<AdCOMDooh>;
  validateUser(
    user: AdCOMUser,
    params: T,
    context: Context
  ): Promise<AdCOMUser>;
  validateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  validateRegs(
    regs: AdCOMRegs,
    params: T,
    context: Context
  ): Promise<AdCOMRegs>;
  validateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}

