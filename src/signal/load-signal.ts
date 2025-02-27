import type { DefaultParams, Runtime } from "@/types";
import type {
  SignalClientIntegration,
  SignalServerIntegration,
  SignalUserConfig,
} from "./types";
import { ServerSignal } from "./server-signal";
import type { Context } from "@/types";
import { ClientSignal } from "./client-signal";

export const loadSignal = async <
  P extends DefaultParams,
>(
  name: string,
  runtime: Runtime,
  context: Context,
  userConfig: SignalUserConfig<P>
): Promise< ClientSignal<unknown, P> | ServerSignal<unknown, P>> => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const integration = (await import(`@signals/${name}/server`))
      .default as SignalServerIntegration<unknown, P>;
    const config = await import(`@signals/${name}/signal.json`);
    return new ServerSignal(config, userConfig, context, integration);
  } else if (runtime === "client") {
    const integration = (await import(`@signals/${name}/client`))
      .default as SignalClientIntegration<unknown, P>;
    const config = await import(`@signals/${name}/signal.json`);
    return new ClientSignal(config, userConfig, context, integration);
  }

  throw new Error('Invalid runtime specified');
};
