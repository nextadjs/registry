import {
  createClientMeasurement,
} from "@/measurement";
import config from "./measurement.json";
import type { Params } from "./types";

const measurement = await createClientMeasurement<Params>(config.name);

measurement.on("init", () => {
  console.log("init!!!!!!!!");
});

export default measurement;
