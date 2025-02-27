import type { DefaultParams } from "@/types";
import type { SignalOpenRTBIntegration, SignalUserConfig } from "../types";
import type { AdCOMContext } from "@/types/adcom";
import { OpenRTB26Handler } from "./openrtb-26-handler";

export class OpenRTBHandler<P extends DefaultParams, C extends AdCOMContext> {
  public constructor(
    private userConfig: SignalUserConfig<P>,
    private context: C,
    private integration: SignalOpenRTBIntegration<P, C>
  ) {}

  public handleV26() {
    return new OpenRTB26Handler(
      this.userConfig,
      this.context,
      this.integration?.v26
    );
  }
}
