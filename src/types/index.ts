import type {
  AdCOMContextWithApp,
  AdCOMContextWithDooh,
  AdCOMContextWithSite,
} from "./adcom";

export type Runtime = "client" | "server";

export interface DefaultParams {}

export type Context = ContextWithSite | ContextWithApp | ContextWithDooh;

export type ContextWithSite = {
    channel: "site";
    source: AdCOMContextWithSite;
};
export type ContextWithApp = {
    channel: "app";
    source: AdCOMContextWithSite;
};
export type ContextWithDooh = {
    channel: "dooh";
    source: AdCOMContextWithDooh;
};

export type Channel = "site" | "app" | "dooh";

// 取引方法はラインタイム関係なく並列で管理するため、PrebidはPrebid Serverと明確に分離するためにPrebid.jsにする
export type TradeMethod = "OpenRTB" | "Prebid.js";

export interface UserConfig {}
