import type { DefaultParams } from "@/types";
import { Measurement } from "./measurement";

export class ServerMeasurement<
  TParams extends DefaultParams = DefaultParams
> extends Measurement<TParams> {
  protected runtime = "server" as const;
}
