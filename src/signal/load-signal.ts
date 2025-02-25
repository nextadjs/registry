import type { DefaultParams, Runtime } from "@/types";
import type { SignalClientIntegration, SignalServerIntegration, SignalUserConfig } from "./types";
import { ServerSignal } from "./server-signal";
import type { AdCOMContext } from "@/types/adcom";
import { ClientSignal } from "./client-signal";

export const loadSignal = async <
  T1 extends DefaultParams,
  T2 extends AdCOMContext
>(
  name: string,
  runtime: Runtime,
  context: T2,
  userConfig: SignalUserConfig<T1>
) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const integration = (await import(`@signals/${name}/server`))
      .default as SignalServerIntegration<T1>;
    const config = await import(`@signals/${name}/signal.json`);
    return new ServerSignal(config, userConfig, context, integration);
  } else if (runtime === "client") {
    const integration = (await import(`@signals/${name}/client`))
      .default as SignalClientIntegration<T1>;
    const config = await import(`@signals/${name}/signal.json`);
    return new ClientSignal(config, userConfig, context, integration);
  }

  throw new Error();
};
