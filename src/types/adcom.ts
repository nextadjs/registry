import type { App, Context, Dooh, Site } from "iab-adcom/context";
import type { Ad } from "iab-adcom/media";
import type { Placement } from "iab-adcom/placement";

export interface AdCOMAd extends Ad {}

export interface AdCOMPlacement extends Placement {
  tagid: string;
}

export type AdCOMContext = ContextWithSite | ContextWithApp | ContextWithDooh;

export interface ContextWithSite extends Context {
  site: Site;
  dooh: never;
  app: never;
}
export interface ContextWithApp extends Context {
  site: never;
  dooh: never;
  app: App;
}

export interface ContextWithDooh extends Context {
  site: never;
  dooh: Dooh;
  app: never;
}
