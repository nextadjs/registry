export type Runtime = 'client' | 'server';

export type LoaderFn<T> = (runtime: Runtime) => Promise<T>;

export type CustomParams = Record<string, unknown>;