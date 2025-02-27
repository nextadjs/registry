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
import type { SignalOpenRTBIntegration } from "./openrtb";
import type { DefaultParams } from "@/types";

export interface SignalClientContextIntegration<T extends DefaultParams> {
  site?: {
    openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithSite>;
  };
  app?: {
    openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithApp>;
  };
  dooh?: {
    openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithDooh>;
  };
  decorateSite(
    site: AdCOMSite,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMSite>;
  decorateApp(
    app: AdCOMApp,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMApp>;
  decorateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMDooh>;
  decorateUser(
    user: AdCOMUser,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMUser>;
  decorateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  decorateRegs(
    regs: AdCOMRegs,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMRegs>;
  decorateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}

export interface SignalServerContextIntegration<T extends DefaultParams> {
  site?: {
    openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithSite>;
  };
  app?: {
    openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithApp>;
  };
  dooh?: {
    openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithDooh>;
  };
  decorateSite(
    site: AdCOMSite,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMSite>;
  decorateApp(
    app: AdCOMApp,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMApp>;
  decorateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMDooh>;
  decorateUser(
    user: AdCOMUser,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMUser>;
  decorateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  decorateRegs(
    regs: AdCOMRegs,
    params: T,
    context: AdCOMContext
  ): Promise<AdCOMRegs>;
  decorateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}
