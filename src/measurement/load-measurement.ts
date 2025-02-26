import type { DefaultParams, Runtime } from "@/types";
import { ServerMeasurement } from "./server-measurement";
import { ClientMeasurement } from "./client-measurement";
import type { AdCOMContext } from "@/types/adcom";
import type { MeasurementUserConfig } from "./types";
import type { Measurement } from "./measurement";

export const loadSignal = async <
  P extends DefaultParams,
  C extends AdCOMContext
>(
  name: string,
  runtime: Runtime,
  context: C,
  userConfig: MeasurementUserConfig<P>
) => {
  const measurements: Measurement<P>[] = [];

  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const serverMeasurement = (await import(`@measurements/${name}/${runtime}`))
      .default as ServerMeasurement<P>;
    measurements.push(serverMeasurement);
  } else if (runtime === "client") {
    const clientMeasurement = (await import(`@measurements/${name}/${runtime}`))
      .default as ClientMeasurement<P>;
    measurements.push(clientMeasurement);
  }

  const measurement = (await import(`@measurements/${name}/measurement`))
    .default as Measurement<P>;
  measurements.push(measurement);

  measurements.forEach((measurement) => {
    measurement.initialize(userConfig, context);
  });

  return measurements;
};
