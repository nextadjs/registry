export type Runtime = "client" | "server";

export interface DefaultParams {}

export type Context = "site" | "app" | "dooh";

// 取引方法はラインタイム関係なく並列で管理するため、PrebidはPrebid Serverと明確に分離するためにPrebid.jsにする
export type TradeMethod = "OpenRTB" | "Prebid.js";

export interface UserConfig {}
