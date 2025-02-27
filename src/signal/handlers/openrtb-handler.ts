import type { DefaultParams } from "@/types";
import type { SignalOpenRTBIntegration, SignalUserConfig } from "../types";
import type { Context } from "@/types";
import { OpenRTB26Handler } from "./openrtb-26-handler";

export class OpenRTBHandler<P extends DefaultParams> {
  public constructor(
    private userConfig: SignalUserConfig<P>,
    private context: Context,
    private integration: SignalOpenRTBIntegration<P, Context>
  ) {}

  public handleV26() {
    return new OpenRTB26Handler(
      this.userConfig,
      this.context,
      this.integration?.v26
    );
  }
}
