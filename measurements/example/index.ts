import { measurementRegistry } from "@/index";
import config from "./measurement.json";
import { loadMeasurement } from "@/measurement/load-measurement";

measurementRegistry.register(config.name, (runtime) =>
  loadMeasurement(config.name, runtime)
);
