import type { Runtime } from "@/types";
import type { ComplianceSpec } from "./types";
import { Compliance } from "./compliance";

export const loadCompliance = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  const spec = (await import(`@compliances/${name}/${runtime}`)) as ComplianceSpec;
  const config = await import(`@compliances/${name}/compliance.json`);
  return new Compliance(config, spec);
};
