import type { DefaultParams, Runtime } from "@/types";
import type {
  SignalClientIntegration,
  SignalConfig,
  SignalServerIntegration,
  SignalUserConfig,
} from "./types";
import { ServerSignal } from "./server-signal";
import type { Context } from "@/types";
import { ClientSignal } from "./client-signal";

export const loadSignal = async <P extends DefaultParams>(
  name: string,
  runtime: Runtime,
  context: Context,
  userConfig: SignalUserConfig<P>
): Promise<ClientSignal<unknown, P> | ServerSignal<unknown, P>> => {
  // TODO: 適切なエラーハンドリング
  try {
    const config = (await import(
      `@signals/${name}/signal.json`
    )) as SignalConfig;

    if (
      runtime === "server" &&
      config.capabilities.runtime.includes("server")
    ) {
      const integration = (await import(`@signals/${name}/server`))
        .default as SignalServerIntegration<unknown, P>;
      return new ServerSignal(config, userConfig, context, integration);
    } else if (runtime === "client") {
      if (config.capabilities.runtime.includes("client")) {
        const integration = (await import(`@signals/${name}/client`))
          .default as SignalClientIntegration<unknown, P>;
        return new ClientSignal(config, userConfig, context, integration);
      } else {
        throw new Error("サポートしてないよ");
      }
    }
  } catch (error) {
    throw new Error();
  }
  throw new Error("Invalid runtime specified");
};
