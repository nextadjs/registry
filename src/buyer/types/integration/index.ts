import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
  AdCOMContextWithApp,
  AdCOMContextWithDooh,
  AdCOMContextWithSite,
} from "@/types/adcom";
import type { BuyerOpenRTBIntegration } from "./openrtb";

export type BuyerIntegration<T extends DefaultParams> =
  BuyerClientIntegration<T> | BuyerServerIntegration<T>;

export interface BuyerClientIntegration<T extends DefaultParams> {
  openrtb?: BuyerOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb: BuyerOpenRTBIntegration<T, AdCOMContextWithSite>;
    };
    app?: {
      openrtb: BuyerOpenRTBIntegration<T, AdCOMContextWithApp>;
    };
    dooh?: {
      openrtb: BuyerOpenRTBIntegration<T, AdCOMContextWithDooh>;
    };
  };
}

export interface BuyerServerIntegration<T extends DefaultParams> {
  openrtb?: BuyerOpenRTBIntegration<T, AdCOMContext>;
  context?: {
    site?: {
      openrtb?: BuyerOpenRTBIntegration<T, AdCOMContextWithSite>;
    };
    app?: {
      openrtb?: BuyerOpenRTBIntegration<T, AdCOMContextWithApp>;
    };
    dooh?: {
      openrtb?: BuyerOpenRTBIntegration<T, AdCOMContextWithDooh>;
    };
  };
}

export * from "./openrtb";
