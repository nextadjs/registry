import type { DefaultParams } from "@/types";
import type { ClientBuyer, ServerBuyer } from "../";
import type { AdCOMContext } from "@/types/adcom";

export type Buyer<P extends DefaultParams, C extends AdCOMContext> =
  | ClientBuyer<P, C>
  | ServerBuyer<P, C>;

export * from "./integration";
export * from "./config";
