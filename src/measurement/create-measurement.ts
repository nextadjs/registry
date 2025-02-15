import { scriptLoader } from "@/core/script-loader";
import { eventEmitter } from "./event-emitter";
import { Measurement } from "./measurement";
import { measurementRegistry } from "..";
import type { DefaultParams } from "@/types";

export const createMeasurement = async <TParams extends DefaultParams = DefaultParams>(name: string): Promise<Measurement> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new Measurement<TParams>(config, eventEmitter, scriptLoader);
  measurementRegistry.register(name, async (_) => {
    return measurement;
  });
  return measurement;
};
