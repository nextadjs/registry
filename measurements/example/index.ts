import { loadMeasurement } from "@/measurement";
import { measurementRegistry } from "@/index";
import config from "./measurement.json";

measurementRegistry.register(config.name, loadMeasurement);