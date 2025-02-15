import type { CustomParams, Runtime } from "@/types";
import { ServerSignal } from "./server-signal";
import { ClientSignal } from "./client-signal";
import type {
  ClientAsyncCollect,
  ServerAsyncCollect,
  SignalSpec,
} from "./types";

export const loadSignal = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const spec = (await import(`@signals/${name}/${runtime}`))
      .default as SignalSpec<ServerAsyncCollect, unknown, CustomParams>;
    const config = await import(`@signals/${name}/signal.json`);
    return new ServerSignal(config, spec);
  } else if (runtime === "client") {
    const spec = (await import(`@signals/${name}/${runtime}`))
      .default as SignalSpec<ClientAsyncCollect, unknown, CustomParams>;
    const config = await import(`@signals/${name}/signal.json`);
    return new ClientSignal(config, spec);
  }
};
