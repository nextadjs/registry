export type Runtime = 'client' | 'server';

export type LoaderFn<T> = (runtime: Runtime) => Promise<T>;

export interface DefaultParams {}

export type Context = 'site' | 'app' | 'dooh';