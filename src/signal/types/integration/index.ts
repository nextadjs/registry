import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type {
  SignalClientContextIntegration,
  SignalServerContextIntegration,
} from "./context";
import type { SignalOpenRTB26Integration } from "./openrtb";

export type SignalIntegration<T extends DefaultParams> =
  | SignalClientIntegration<T>
  | SignalServerIntegration<T>;

export interface SignalClientIntegration<T extends DefaultParams> {
  openrtbV26?: SignalOpenRTB26Integration<T, Context>;
  context?: SignalClientContextIntegration<T>;
}

export interface SignalServerIntegration<T extends DefaultParams> {
  openrtbV26?: SignalOpenRTB26Integration<T, Context>;
  context?: SignalServerContextIntegration<T>;
}

export * from "./openrtb";
export * from './context';