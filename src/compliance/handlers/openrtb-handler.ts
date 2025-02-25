import type { DefaultParams } from "@/types";
import type { ComplianceOpenRTBIntegration, ComplianceUserConfig } from "../types";
import type { AdCOMContext } from "@/types/adcom";

export class OpenRTBHandler<T1 extends DefaultParams, T2 extends AdCOMContext> {
  public constructor(
    private userConfig: ComplianceUserConfig<T1>,
    private context: T2,
    private integration: ComplianceOpenRTBIntegration<T1, T2>
  ) {}

  public handleV26() {
    return new OpenRTBHandler(this.userConfig, this.context, this.integration);
  }
}
