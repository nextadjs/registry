import type { DefaultParams } from "@/types";
import type { ClientBuyer, ServerBuyer } from "../";
import type { AdCOMContext } from "@/types/adcom";

export type Buyer<T1 extends DefaultParams, T2 extends AdCOMContext> =
  | ClientBuyer<T1, T2>
  | ServerBuyer<T1, T2>;

export * from "./integration";
export * from "./config";
