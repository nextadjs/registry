import type {
  Context,
  ContextWithApp,
  ContextWithDooh,
  ContextWithSite,
  DefaultParams,
} from "@/types";
import type { BuyerOpenRTB26Integration } from "./openrtb";

export type BuyerIntegration<T extends DefaultParams> =
  | BuyerClientIntegration<T>
  | BuyerServerIntegration<T>;

export interface BuyerClientIntegration<T extends DefaultParams> {
  channel?: {
    site?: {
      openrtbV26?: BuyerOpenRTB26Integration<T, ContextWithSite>;
    };
    app?: {
      openrtbV26?: BuyerOpenRTB26Integration<T, ContextWithApp>;
    };
    dooh?: {
      openrtbV26?: BuyerOpenRTB26Integration<T, ContextWithDooh>;
    };
  };
}

export interface BuyerServerIntegration<T extends DefaultParams> {
  openrtbV26?: BuyerOpenRTB26Integration<T, Context>;
  channel?: {
    site?: {
      openrtbV26?: BuyerOpenRTB26Integration<T, ContextWithSite>;
    };
    app?: {
      openrtbV26?: BuyerOpenRTB26Integration<T, ContextWithApp>;
    };
    dooh?: {
      openrtbV26?: BuyerOpenRTB26Integration<T, ContextWithDooh>;
    };
  };
}

export * from "./openrtb";
