import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type {
  SignalClientContextIntegration,
  SignalServerContextIntegration,
} from "./context";
import type { SignalOpenRTB26Integration } from "./openrtb";
import type { ClientAsyncCollect, CollectResult, ServerAsyncCollect } from "./collect";

export type SignalIntegration<D, T extends DefaultParams> =
  | SignalClientIntegration<D, T>
  | SignalServerIntegration<D, T>;

export interface SignalClientIntegration<D, T extends DefaultParams> {
  collect(): Promise<CollectResult<D, ClientAsyncCollect>>;
  openrtbV26?: SignalOpenRTB26Integration<D, T, Context>;
  context?: SignalClientContextIntegration<D, T>;
}

export interface SignalServerIntegration<D, T extends DefaultParams> {
  collect(): Promise<CollectResult<D, ServerAsyncCollect>>;
  openrtbV26?: SignalOpenRTB26Integration<D, T, Context>;
  context?: SignalServerContextIntegration<D, T>;
}

export * from "./openrtb";
export * from './context';
export * from './collect';