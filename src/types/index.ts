import type { AdCOMContext } from "./adcom";

export type Runtime = "client" | "server";

export type LoaderFn<T1, T2 extends AdCOMContext> = (runtime: Runtime, config: UserConfig, context: T2) => Promise<T1>;

export interface DefaultParams {}

export type Context = "site" | "app" | "dooh";

export type TradeMethod = "OpenRTB" | "Prebid";

export interface UserConfig {}
