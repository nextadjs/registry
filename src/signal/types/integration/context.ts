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

export interface SignalClientContextIntegration<D, T extends DefaultParams>
  extends SignalAdCOMContextIntegration<D, T> {
  site?: {
    openrtbV26?: SignalOpenRTB26Integration<D, T, ContextWithSite>;
  };
  app?: {
    openrtbV26?: SignalOpenRTB26Integration<D, T, ContextWithApp>;
  };
  dooh?: {
    openrtbV26?: SignalOpenRTB26Integration<D, T, ContextWithDooh>;
  };
}

export interface SignalServerContextIntegration<D, T extends DefaultParams>
  extends SignalAdCOMContextIntegration<D, T> {
  site?: {
    openrtbV26?: SignalOpenRTB26Integration<D, T, ContextWithSite>;
  };
  app?: {
    openrtbV26?: SignalOpenRTB26Integration<D, T, ContextWithApp>;
  };
  dooh?: {
    openrtbV26?: SignalOpenRTB26Integration<D, T, ContextWithDooh>;
  };
}

export interface SignalAdCOMContextIntegration<D, T extends DefaultParams> {
  decorateSite(
    site: AdCOMSite,
    data: D,
    params: T,
    context: Context
  ): AdCOMSite;
  decorateApp(app: AdCOMApp, data: D, params: T, context: Context): AdCOMApp;
  decorateDooh(
    dooh: AdCOMDooh,
    data: D,
    params: T,
    context: Context
  ): AdCOMDooh;
  decorateUser(
    user: AdCOMUser,
    data: D,
    params: T,
    context: Context
  ): AdCOMUser;
  decorateDevice(
    device: AdCOMDevice,
    data: D,
    params: T,
    context: AdCOMDevice
  ): AdCOMDevice;
  decorateRegs(
    regs: AdCOMRegs,
    data: D,
    params: T,
    context: Context
  ): AdCOMRegs;
  decorateRestrictions(
    restrictions: AdCOMRestrictions,
    data: D,
    params: T,
    context: AdCOMRestrictions
  ): AdCOMRestrictions;
}
