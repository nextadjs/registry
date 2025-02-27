import type { Context, DefaultParams } from "@/types";
import type { ComplianceAdCOMContextIntegration, ComplianceUserConfig } from "../types";
import type { AdCOMSite } from "@/types/adcom";

export class ContextHandler<P extends DefaultParams> {
  public constructor(
    private userConfig: ComplianceUserConfig<P>,
    private context: Context,
    private integration?: ComplianceAdCOMContextIntegration<P>
  ) {}

  public async validateSite(site: AdCOMSite): Promise<AdCOMSite> {
    if (this.integration?.validateSite) {
      return this.integration.validateSite(
        site,
        this.userConfig.params,
        this.context
      );
    }

    return site;
  }
}
