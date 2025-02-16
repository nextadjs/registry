import type { Context, Runtime } from "@/types";

export type ComplianceConfig = {
  name: string;
  capabilities: ComplianceCapabilities;
};

export type ComplianceCapabilities = {
  context: Context[];
  runtime: Runtime[];
};
