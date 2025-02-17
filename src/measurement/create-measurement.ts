import { scriptLoader } from "@/core/script-loader";
import { eventEmitter } from "./event-emitter";
import { Measurement } from "./measurement";
import type { DefaultParams } from "@/types";
import { ClientMeasurement } from "./client-measurement";
import { ServerMeasurement } from "./server-measurement";

export const createMeasurement = async <
  TParams extends DefaultParams = DefaultParams
>(
  name: string
): Promise<Measurement> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new Measurement<TParams>(
    config,
    eventEmitter,
    scriptLoader
  );
  return measurement;
};

export const createClientMeasurement = async <
  TParams extends DefaultParams = DefaultParams
>(
  name: string
): Promise<Measurement> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new ClientMeasurement<TParams>(
    config,
    eventEmitter,
    scriptLoader
  );
  return measurement;
};

export const createServerMeasurement = async <
  TParams extends DefaultParams = DefaultParams
>(
  name: string
): Promise<Measurement> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new ServerMeasurement<TParams>(
    config,
    eventEmitter,
    scriptLoader
  );
  return measurement;
};
