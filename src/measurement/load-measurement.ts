import type { Runtime } from "@/types";
import { ServerMeasurement } from "./server-measurement";
import { ClientMeasurement } from "./client-measurement";

export const loadMeasurement = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const measurement = (await import(`@measurements/${name}/${runtime}`))
      .default as ServerMeasurement;
    return measurement;
  } else if (runtime === "client") {
    const measurement = (await import(`@measurements/${name}/${runtime}`))
      .default as ClientMeasurement;
    return measurement;
  }

  throw new Error();
};
