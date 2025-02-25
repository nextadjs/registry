import type { DefaultParams } from "@/types";
import type {
  SignalOpenRTB26Integration,
  SignalUserConfig,
} from "../types";
import type { AdCOMContext } from "@/types/adcom";

export class OpenRTB26Handler<
  T1 extends DefaultParams,
  T2 extends AdCOMContext
> {
  public constructor(
    private userConfig: SignalUserConfig<T1>,
    private context: T2,
    private integration: SignalOpenRTB26Integration<T1, T2>
  ) {}
}
