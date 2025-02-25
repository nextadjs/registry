import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
} from "@/types/adcom";
import type { BuyerOpenRTBIntegration } from "./openrtb";

export type BuyerIntegration<T extends DefaultParams> =
  BuyerClientIntegration<T> | BuyerServerIntegration<T>;

export interface BuyerClientIntegration<T extends DefaultParams> {
  openrtb?: BuyerOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb: BuyerOpenRTBIntegration<T, ContextWithSite>;
    };
    app?: {
      openrtb: BuyerOpenRTBIntegration<T, ContextWithApp>;
    };
    dooh?: {
      openrtb: BuyerOpenRTBIntegration<T, ContextWithDooh>;
    };
  };
}

export interface BuyerServerIntegration<T extends DefaultParams> {
  openrtb?: BuyerOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb?: BuyerOpenRTBIntegration<T, ContextWithSite>;
    };
    app?: {
      openrtb?: BuyerOpenRTBIntegration<T, ContextWithApp>;
    };
    dooh?: {
      openrtb?: BuyerOpenRTBIntegration<T, ContextWithDooh>;
    };
  };
}

export * from "./openrtb";
