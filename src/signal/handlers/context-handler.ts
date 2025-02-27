import type { Context, DefaultParams } from "@/types";
import type { SignalAdCOMContextIntegration, SignalUserConfig } from "../types";
import type { AdCOMSite } from "@/types/adcom";

export class ContextHandler<D, P extends DefaultParams> {
  public constructor(
    private data: D,
    private userConfig: SignalUserConfig<P>,
    private context: Context,
    private integration?: SignalAdCOMContextIntegration<D, P>
  ) {}

  public  decorateSite(site: AdCOMSite): AdCOMSite {
    if (this.integration?.decorateSite) {
      return this.integration.decorateSite(
        site,
        this.data,
        this.userConfig.params,
        this.context
      );
    }

    return site;
  }
}
