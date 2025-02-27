import type { App, Context, Dooh, Regs, Site } from "iab-adcom/context";
import type { Ad } from "iab-adcom/media";
import type { Placement } from "iab-adcom/placement";

export interface AdCOMAd extends Ad {}

export interface AdCOMPlacement extends Placement {
  tagid: string;
}

export type AdCOMContext =
  | AdCOMContextWithSite
  | AdCOMContextWithApp
  | AdCOMContextWithDooh;

export interface AdCOMContextWithSite extends Context {
  site: Site;
  dooh: never;
  app: never;
}
export interface AdCOMContextWithApp extends Context {
  site: never;
  dooh: never;
  app: App;
}

export interface AdCOMContextWithDooh extends Context {
  site: never;
  dooh: Dooh;
  app: never;
}

export interface AdCOMRegs extends Regs {
  ext: Record<string, unknown> & {
    us_privacy?: string;
    gpp?: string;
    gpp_sid?: number[];
  };
}

export type {
  Site as AdCOMSite,
  App as AdCOMApp,
  Dooh as AdCOMDooh,
  User as AdCOMUser,
  Restrictions as AdCOMRestrictions,
  Device as AdCOMDevice,
} from "iab-adcom/context";
