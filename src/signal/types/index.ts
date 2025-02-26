import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientSignal } from "../client-signal";
import type { ServerSignal } from "../server-signal";

export type Signal<P extends DefaultParams, C extends AdCOMContext> =
  | ClientSignal<P, C>
  | ServerSignal<P, C>;

export type SignalType = "identity" | "contextual" | "audience" | "delivery";

export * from "./config";
export * from "./integration";
