import type { DefaultParams } from "@/types";
import type { ComplianceOpenRTBIntegration, ComplianceUserConfig } from "../types";
import type { AdCOMContext } from "@/types/adcom";
import { OpenRTB26Handler } from "./openrtb-26-handler";

export class OpenRTBHandler<P extends DefaultParams> {
  public constructor(
    private userConfig: ComplianceUserConfig<P>,
    private context: AdCOMContext,
    private integration: ComplianceOpenRTBIntegration<P, AdCOMContext>
  ) {}

  public handleV26() {
    return new OpenRTB26Handler(
      this.userConfig,
      this.context,
      this.integration?.v26
    );
  }
}
