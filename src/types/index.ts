export type Runtime = 'client' | 'server';

export type LoaderFn<T> = (runtime: Runtime, config: UserConfig) => Promise<T>;

export interface DefaultParams {}

export type Context = 'site' | 'app' | 'dooh';

export type TradeMethod = 'OpenRTB' | 'Prebid';

export interface UserConfig {};