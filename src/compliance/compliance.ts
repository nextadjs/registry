import type { ComplianceConfig, ComplianceSpec } from "./types";

export class Compliance {
  public constructor(
    private readonly _config: ComplianceConfig,
    private readonly _spec: ComplianceSpec
  ) {}

  public get config(): ComplianceConfig {
    return this._config;
  }

  public get spec(): ComplianceSpec {
    return this._spec;
  }
}