import type { DefaultParams } from "@/types";
import type {
  Context,
} from "@/types";
import type {
  SignalClientChannelIntegration,
  SignalServerChannelIntegration,
} from "./channel";
import type { SignalOpenRTB26Integration } from "./openrtb";
import type { ClientAsyncCollect, CollectResult, ServerAsyncCollect } from "./collect";

export type SignalIntegration<D, T extends DefaultParams> =
  | SignalClientIntegration<D, T>
  | SignalServerIntegration<D, T>;

export interface SignalClientIntegration<D, T extends DefaultParams> {
  collect(): Promise<CollectResult<D, ClientAsyncCollect>>;
  openrtbV26?: SignalOpenRTB26Integration<D, T, Context>;
  channel?: SignalClientChannelIntegration<D, T>;
}

export interface SignalServerIntegration<D, T extends DefaultParams> {
  collect(): Promise<CollectResult<D, ServerAsyncCollect>>;
  openrtbV26?: SignalOpenRTB26Integration<D, T, Context>;
  channel?: SignalServerChannelIntegration<D, T>;
}

export * from "./openrtb";
export * from './channel';
export * from './collect';