import type { DefaultParams } from "@/types";
import { Measurement } from "./measurement";

export class ClientMeasurement<
  TParams extends DefaultParams = DefaultParams
> extends Measurement<TParams> {
    protected runtime = "client" as const;
}
