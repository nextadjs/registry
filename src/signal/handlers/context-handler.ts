import type { Context, DefaultParams } from "@/types";
import type { SignalAdCOMContextIntegration, SignalUserConfig } from "../types";
import type { AdCOMSite } from "@/types/adcom";

export class ContextHandler<P extends DefaultParams> {
  public constructor(
    private userConfig: SignalUserConfig<P>,
    private context: Context,
    private integration?: SignalAdCOMContextIntegration<P>
  ) {}

  public async decorateSite(site: AdCOMSite): Promise<AdCOMSite> {
    if (this.integration?.decorateSite) {
      return this.integration.decorateSite(
        site,
        this.userConfig.params,
        this.context
      );
    }

    return site;
  }
}
