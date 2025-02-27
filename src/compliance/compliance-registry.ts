import type { DefaultParams, Runtime } from "@/types";
import { loadCompliance } from "./load-compliance";
import type { Compliance, ComplianceUserConfig } from "./types";
import type { Context } from "@/types";
import type { ClientCompliance } from "./client-compliance";
import type { ServerCompliance } from "./server-compliance";

export class ComplianceRegistry {
  private modules = new Map<string, typeof loadCompliance>();

  public register(name: string, loader: typeof loadCompliance) {
    this.modules.set(name, loader);
  }

  public async loadForClient<P extends DefaultParams>(
    name: string,
    userConfig: ComplianceUserConfig<P>,
    context: Context
  ): Promise<ClientCompliance<P>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientCompliance<P>
    >;
  }

  public async loadForServer<P extends DefaultParams>(
    name: string,
    userConfig: ComplianceUserConfig<P>,
    context: Context
  ): Promise<ServerCompliance<P>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerCompliance<P>
    >;
  }

  public async load<P extends DefaultParams>(
    name: string,
    runtime: Runtime,
    userConfig: ComplianceUserConfig<P>,
    context: Context
  ): Promise<Compliance<P>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<P>(name, runtime, context, userConfig);
  }
}
