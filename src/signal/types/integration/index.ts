import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
  AdCOMContextWithApp,
  AdCOMContextWithDooh,
  AdCOMContextWithSite,
} from "@/types/adcom";
import type { SignalOpenRTBIntegration } from "./openrtb";

export type SignalIntegration<T extends DefaultParams> =
  SignalClientIntegration<T> | SignalServerIntegration<T>;

export interface SignalClientIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithSite>;
    };
    app?: {
      openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithApp>;
    };
    dooh?: {
      openrtb: SignalOpenRTBIntegration<T, AdCOMContextWithDooh>;
    };
  };
}

export interface SignalServerIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb?: SignalOpenRTBIntegration<T, AdCOMContextWithSite>;
    };
    app?: {
      openrtb?: SignalOpenRTBIntegration<T, AdCOMContextWithApp>;
    };
    dooh?: {
      openrtb?: SignalOpenRTBIntegration<T, AdCOMContextWithDooh>;
    };
  };
}

export * from "./openrtb";
