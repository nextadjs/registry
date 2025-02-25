import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
} from "@/types/adcom";
import type { SignalOpenRTBIntegration } from "./openrtb";

export type SignalIntegration<T extends DefaultParams> =
  SignalClientIntegration<T> | SignalServerIntegration<T>;

export interface SignalClientIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb: SignalOpenRTBIntegration<T, ContextWithSite>;
    };
    app?: {
      openrtb: SignalOpenRTBIntegration<T, ContextWithApp>;
    };
    dooh?: {
      openrtb: SignalOpenRTBIntegration<T, ContextWithDooh>;
    };
  };
}

export interface SignalServerIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb?: SignalOpenRTBIntegration<T, ContextWithSite>;
    };
    app?: {
      openrtb?: SignalOpenRTBIntegration<T, ContextWithApp>;
    };
    dooh?: {
      openrtb?: SignalOpenRTBIntegration<T, ContextWithDooh>;
    };
  };
}

export * from "./openrtb";
