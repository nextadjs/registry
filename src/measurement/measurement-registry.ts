import type { DefaultParams, Runtime } from "@/types";
import { loadMeasurement } from "./load-measurement";
import type { MeasurementUserConfig } from "./types";
import type { ClientMeasurement } from "./client-measurement";
import type { ServerMeasurement } from "./server-measurement";
import type { Measurement } from "./measurement";
import type { AdCOMContext } from "@/types/adcom";

export class MeasurementRegistry {
  private modules = new Map<string, typeof loadMeasurement>();

  public register(name: string, loader: typeof loadMeasurement) {
    this.modules.set(name, loader);
  }

  public async loadForClient<P extends DefaultParams>(
    name: string,
    context: AdCOMContext,
    userConfig: MeasurementUserConfig<P>
  ): Promise<ClientMeasurement<P>[]> {
    return this.load(name, "client", context, userConfig) as Promise<
      ClientMeasurement<P>[]
    >;
  }

  public async loadForServer<P extends DefaultParams>(
    name: string,
    context: AdCOMContext,
    userConfig: MeasurementUserConfig<P>
  ): Promise<ServerMeasurement<P>[]> {
    return this.load(name, "server", context, userConfig) as Promise<
      ServerMeasurement<P>[]
    >;
  }

  public async load<P extends DefaultParams>(
    name: string,
    runtime: Runtime,
    context: AdCOMContext,
    userConfig: MeasurementUserConfig<P>
  ): Promise<Measurement<P>[]> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader<P>(name, runtime, context, userConfig);
  }
}
