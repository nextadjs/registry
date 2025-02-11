import { scriptLoader } from "@/core/script-loader";
import { eventEmitter } from "./event-emitter";
import { Measurement } from "./measurement";
import { measurementRegistry } from "..";

export const createMeasurement = async (name: string): Promise<Measurement> => {
  const config = await import(`@measurements/${name}/measurement.json`);
  const measurement = new Measurement(config, eventEmitter, scriptLoader);
  measurementRegistry.register(name, async (_) => {
    return measurement;
  });
  return measurement;
};
