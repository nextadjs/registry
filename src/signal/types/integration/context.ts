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
import type { SignalOpenRTB26Integration } from "./openrtb";

export interface SignalClientContextIntegration<T extends DefaultParams>
  extends SignalAdCOMContextIntegration<T> {
  site?: {
    openrtbV26?: SignalOpenRTB26Integration<T, ContextWithSite>;
  };
  app?: {
    openrtbV26?: SignalOpenRTB26Integration<T, ContextWithApp>;
  };
  dooh?: {
    openrtbV26?: SignalOpenRTB26Integration<T, ContextWithDooh>;
  };
}

export interface SignalServerContextIntegration<T extends DefaultParams>
  extends SignalAdCOMContextIntegration<T> {
  site?: {
    openrtbV26?: SignalOpenRTB26Integration<T, ContextWithSite>;
  };
  app?: {
    openrtbV26?: SignalOpenRTB26Integration<T, ContextWithApp>;
  };
  dooh?: {
    openrtbV26?: SignalOpenRTB26Integration<T, ContextWithDooh>;
  };
}

export interface SignalAdCOMContextIntegration<T extends DefaultParams> {
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
