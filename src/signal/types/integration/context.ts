import type {
  AdCOMApp,
  AdCOMDevice,
  AdCOMDooh,
  AdCOMRegs,
  AdCOMRestrictions,
  AdCOMSite,
  AdCOMUser,
} from "@/types/adcom";
import type { SignalOpenRTBIntegration } from "./openrtb";
import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
  DefaultParams,
} from "@/types";

export interface SignalClientContextIntegration<T extends DefaultParams> {
  site?: {
    openrtb: SignalOpenRTBIntegration<T, ContextWithSite>;
  };
  app?: {
    openrtb: SignalOpenRTBIntegration<T, ContextWithApp>;
  };
  dooh?: {
    openrtb: SignalOpenRTBIntegration<T, ContextWithDooh>;
  };
  decorateSite(
    site: AdCOMSite,
    params: T,
    context: Context
  ): Promise<AdCOMSite>;
  decorateApp(app: AdCOMApp, params: T, context: Context): Promise<AdCOMApp>;
  decorateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: Context
  ): Promise<AdCOMDooh>;
  decorateUser(
    user: AdCOMUser,
    params: T,
    context: Context
  ): Promise<AdCOMUser>;
  decorateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  decorateRegs(
    regs: AdCOMRegs,
    params: T,
    context: Context
  ): Promise<AdCOMRegs>;
  decorateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}

export interface SignalServerContextIntegration<T extends DefaultParams> {
  site?: {
    openrtb: SignalOpenRTBIntegration<T, ContextWithSite>;
  };
  app?: {
    openrtb: SignalOpenRTBIntegration<T, ContextWithApp>;
  };
  dooh?: {
    openrtb: SignalOpenRTBIntegration<T, ContextWithDooh>;
  };
  decorateSite(
    site: AdCOMSite,
    params: T,
    context: Context
  ): Promise<AdCOMSite>;
  decorateApp(app: AdCOMApp, params: T, context: Context): Promise<AdCOMApp>;
  decorateDooh(
    dooh: AdCOMDooh,
    params: T,
    context: Context
  ): Promise<AdCOMDooh>;
  decorateUser(
    user: AdCOMUser,
    params: T,
    context: Context
  ): Promise<AdCOMUser>;
  decorateDevice(
    device: AdCOMDevice,
    params: T,
    context: AdCOMDevice
  ): Promise<AdCOMDevice>;
  decorateRegs(
    regs: AdCOMRegs,
    params: T,
    context: Context
  ): Promise<AdCOMRegs>;
  decorateRestrictions(
    restrictions: AdCOMRestrictions,
    params: T,
    context: AdCOMRestrictions
  ): Promise<AdCOMRestrictions>;
}
