import type { DefaultParams } from "@/types";
import type { ClientSignal } from "../client-signal";
import type { ServerSignal } from "../server-signal";

export type Signal<D, P extends DefaultParams> =
  | ClientSignal<D, P>
  | ServerSignal<D, P>;

export type SignalType = "identity" | "contextual" | "audience" | "delivery";

export * from "./config";
export * from "./integration";
