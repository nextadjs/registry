import type { ComplianceConfig, ComplianceSpec } from "./types";

export class Compliance<TComplianceSpec = ComplianceSpec> {
  public constructor(
    private readonly _config: ComplianceConfig,
    private readonly _spec: TComplianceSpec
  ) {}

  public get config(): ComplianceConfig {
    return this._config;
  }

  public get spec(): TComplianceSpec {
    return this._spec;
  }
}