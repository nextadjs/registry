import type { DefaultParams, Runtime } from "@/types";
import { loadCompliance } from "./load-compliance";
import type { Compliance, ComplianceUserConfig } from "./types";
import type { AdCOMContext } from "@/types/adcom";
import type { ClientCompliance } from "./client-compliance";
import type { ServerCompliance } from "./server-compliance";

export class ComplianceRegistry {
  private modules = new Map<string, typeof loadCompliance>();

  public register(name: string, loader: typeof loadCompliance) {
    this.modules.set(name, loader);
  }

  public async loadForClient<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    userConfig: ComplianceUserConfig<T1>,
    context: T2
  ): Promise<ClientCompliance<T1, T2>> {
    return this.load(name, "client", userConfig, context) as Promise<
      ClientCompliance<T1, T2>
    >;
  }

  public async loadForServer<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    userConfig: ComplianceUserConfig<T1>,
    context: T2
  ): Promise<ServerCompliance<T1, T2>> {
    return this.load(name, "server", userConfig, context) as Promise<
      ServerCompliance<T1, T2>
    >;
  }

  public async load<T1 extends DefaultParams, T2 extends AdCOMContext>(
    name: string,
    runtime: Runtime,
    userConfig: ComplianceUserConfig<T1>,
    context: T2
  ): Promise<Compliance<T1, T2>> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<T1, T2>(name, runtime, context, userConfig);
  }
}
