import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientCompliance } from "../client-compliance";
import type { ServerCompliance } from "../server-compliance";

export type Compliance<P extends DefaultParams> =
  | ClientCompliance<P>
  | ServerCompliance<P>;

export type ComplianceType = "identity" | "contextual" | "audience" | "delivery";

export * from "./config";
export * from "./integration";
