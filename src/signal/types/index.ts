import type { DefaultParams } from "@/types";
import type { ClientSignal } from "../client-signal";
import type { ServerSignal } from "../server-signal";

export type Signal<P extends DefaultParams> =
  | ClientSignal<P>
  | ServerSignal<P>;

export type SignalType = "identity" | "contextual" | "audience" | "delivery";

export * from "./config";
export * from "./integration";
