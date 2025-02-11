import { createMeasurement } from "@/measurement";
import config from "./measurement.json";

const measurement = await createMeasurement(config.name);

measurement.on("init", () => {
  console.log("init!!!!!!!!");
});

measurement.registerThirdPartyScript(
  "https://example.com/third-party-script.js",
  () => {}
);

export default measurement;