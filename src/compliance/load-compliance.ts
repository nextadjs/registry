import type { DefaultParams, Runtime } from "@/types";
import type { ComplianceClientIntegration, ComplianceServerIntegration, ComplianceUserConfig } from "./types";
import { ServerCompliance } from "./server-compliance";
import type { AdCOMContext } from "@/types/adcom";
import { ClientCompliance } from "./client-compliance";

export const loadCompliance = async <
  T1 extends DefaultParams,
  T2 extends AdCOMContext
>(
  name: string,
  runtime: Runtime,
  context: T2,
  userConfig: ComplianceUserConfig<T1>
) => {
  // TODO: 適切なエラーハンドリング
  if (runtime === "server") {
    const integration = (await import(`@compliances/${name}/server`))
      .default as ComplianceServerIntegration<T1>;
    const config = await import(`@compliances/${name}/compliance.json`);
    return new ServerCompliance(config, userConfig, context, integration);
  } else if (runtime === "client") {
    const integration = (await import(`@compliances/${name}/client`))
      .default as ComplianceClientIntegration<T1>;
    const config = await import(`@compliances/${name}/compliance.json`);
    return new ClientCompliance(config, userConfig, context, integration);
  }

  throw new Error();
};
