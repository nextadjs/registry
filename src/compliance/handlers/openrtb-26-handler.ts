import type { DefaultParams } from "@/types";
import type {
  ComplianceOpenRTB26Integration,
  ComplianceUserConfig,
} from "../types";
import type { AdCOMContext } from "@/types/adcom";

export class OpenRTB26Handler<
  T1 extends DefaultParams,
  T2 extends AdCOMContext
> {
  public constructor(
    private userConfig: ComplianceUserConfig<T1>,
    private context: T2,
    private integration: ComplianceOpenRTB26Integration<T1, T2>
  ) {}
}
