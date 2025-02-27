import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
  DefaultParams,
} from "@/types";
import type { BuyerOpenRTBIntegration } from "./openrtb";

export type BuyerIntegration<T extends DefaultParams> =
  | BuyerClientIntegration<T>
  | BuyerServerIntegration<T>;

export interface BuyerClientIntegration<T extends DefaultParams> {
  openrtb?: BuyerOpenRTBIntegration<T, Context>;
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
  openrtb?: BuyerOpenRTBIntegration<T, Context>;
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
