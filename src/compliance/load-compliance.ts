import type { DefaultParams, Runtime } from "@/types";
import type {
  ComplianceClientIntegration,
  ComplianceServerIntegration,
  ComplianceUserConfig,
} from "./types";
import { ServerCompliance } from "./server-compliance";
import type { AdCOMContext } from "@/types/adcom";
import { ClientCompliance } from "./client-compliance";

export const loadCompliance = async <
  P extends DefaultParams
>(
  name: string,
  runtime: Runtime,
  context: AdCOMContext,
  userConfig: ComplianceUserConfig<P>
) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const integration = (await import(`@compliances/${name}/server`))
      .default as ComplianceServerIntegration<P>;
    const config = await import(`@compliances/${name}/compliance.json`);
    return new ServerCompliance(config, userConfig, context, integration);
  } else if (runtime === "client") {
    const integration = (await import(`@compliances/${name}/client`))
      .default as ComplianceClientIntegration<P>;
    const config = await import(`@compliances/${name}/compliance.json`);
    return new ClientCompliance(config, userConfig, context, integration);
  }

  throw new Error();
};
