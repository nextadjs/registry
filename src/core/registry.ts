import type { LoaderFn, Runtime } from "@/types";

export class Registry<T> {
  private modules = new Map<string, LoaderFn<T>>();

  public register(name: string, loader: LoaderFn<T>) {
    this.modules.set(name, loader);
  }

  public async load(name: string, runtime: Runtime): Promise<T> {
    const loader = this.modules.get(name);
    // TODO: Errorの例外化
    if (!loader) throw new Error(`Module ${name} not found`);
    return loader(runtime);
  }
}
