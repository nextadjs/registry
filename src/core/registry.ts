import type { LoaderFn, Runtime, UserConfig } from "@/types";

export class Registry<T> {
  private modules = new Map<string, LoaderFn<T>>();

  public register(name: string, loader: LoaderFn<T>) {
    this.modules.set(name, loader);
  }

  public async loadForClient(name: string, config: UserConfig): Promise<T> {
    return this.load(name, "client", config);
  }

  public async loadForServer(name: string, config: UserConfig): Promise<T> {
    return this.load(name, "server", config);
  }

  public async load(
    name: string,
    runtime: Runtime,
    config: UserConfig
  ): Promise<T> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader(runtime, config);
  }
}
