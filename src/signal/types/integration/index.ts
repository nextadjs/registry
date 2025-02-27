import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type { SignalOpenRTBIntegration } from "./openrtb";
import type {
  SignalClientContextIntegration,
  SignalServerContextIntegration,
} from "./context";

export type SignalIntegration<T extends DefaultParams> =
  | SignalClientIntegration<T>
  | SignalServerIntegration<T>;

export interface SignalClientIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, Context>;
  context?: SignalClientContextIntegration<T>;
}

export interface SignalServerIntegration<T extends DefaultParams> {
  openrtb?: SignalOpenRTBIntegration<T, Context>;
  context?: SignalServerContextIntegration<T>;
}

export * from "./openrtb";
export * from './context';