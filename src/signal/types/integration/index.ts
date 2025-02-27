import type { DefaultParams } from "@/types";
import type {
  AdCOMContext,
} from "@/types/adcom";
import type { SignalOpenRTBIntegration } from "./openrtb";
import type {
  SignalClientContextIntegration,
  SignalServerContextIntegration,
} from "./context";

export type SignalIntegration<T extends DefaultParams> =
  | SignalClientIntegration<T>
  | SignalServerIntegration<T>;

export interface SignalClientIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, AdCOMContext>;
  context?: SignalClientContextIntegration<T>;
}

export interface SignalServerIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, AdCOMContext>;
  context?: SignalServerContextIntegration<T>;
}

export * from "./openrtb";
export * from './context';