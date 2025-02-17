import {
  createClientMeasurement,
  createMeasurement,
  createServerMeasurement,
} from "@/measurement";
import config from "./measurement.json";
import type { Params } from "./types";

const measurement = await createMeasurement<Params>(config.name);
// const clientMeasurement = await createClientMeasurement<Params>(config.name);
// const ServerMeasurement = await createServerMeasurement<Params>(config.name);

measurement.on("init", () => {
  console.log("init!!!!!!!!");
});

measurement.registerThirdPartyScript(
  "https://example.com/third-party-script.js",
  () => {}
);

export default measurement;
