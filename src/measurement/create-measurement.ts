import { scriptLoader } from "@/core/script-loader";
import { eventEmitter } from "./event-emitter";
import { Measurement } from "./measurement";
import type { DefaultParams } from "@/types";
import { ClientMeasurement } from "./client-measurement";
import { ServerMeasurement } from "./server-measurement";

export const createMeasurement = async <
  T extends DefaultParams = DefaultParams
>(
  name: string
): Promise<Measurement<T>> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new Measurement<T>(
    config,
    eventEmitter,
    scriptLoader
  );
  return measurement;
};

export const createClientMeasurement = async <
  T extends DefaultParams = DefaultParams
>(
  name: string
): Promise<Measurement<T>> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new ClientMeasurement<T>(
    config,
    eventEmitter,
    scriptLoader
  );
  return measurement;
};

export const createServerMeasurement = async <
  T extends DefaultParams = DefaultParams
>(
  name: string
): Promise<Measurement<T>> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new ServerMeasurement<T>(
    config,
    eventEmitter,
    scriptLoader
  );
  return measurement;
};
