import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientSignal } from "../client-signal";
import type { ServerSignal } from "../server-signal";

export type Signal<T1 extends DefaultParams, T2 extends AdCOMContext> =
  | ClientSignal<T1, T2>
  | ServerSignal<T1, T2>;

export * from "./config";
export * from "./integration";
