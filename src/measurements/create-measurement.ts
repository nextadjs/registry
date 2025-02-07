import { scriptLoader } from "@/core/script-loader";
import { eventEmitter } from "./event-emitter";
import { Measurement } from "./measurement";

export const createMeasurement = async (name: string): Promise<Measurement> => {
  const config = await import(`@bidders/${name}/bidder.json`);
  return new Measurement(config, eventEmitter, scriptLoader);
};