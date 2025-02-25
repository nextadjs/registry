import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientCompliance } from "../client-compliance";
import type { ServerCompliance } from "../server-compliance";

export type Compliance<T1 extends DefaultParams, T2 extends AdCOMContext> =
  | ClientCompliance<T1, T2>
  | ServerCompliance<T1, T2>;

export * from "./config";
export * from "./integration";
