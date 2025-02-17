import type { App, Context, Dooh, Site } from "iab-adcom/context";
import type { Ad } from "iab-adcom/media";
import type { Placement } from "iab-adcom/placement";

export interface AdCOMAd extends Ad {}

export interface AdCOMPlacement extends Placement {
  tagid: string;
}

export interface AdCOMContext extends Context {}

export interface ContextWithSite extends AdCOMContext {
  site: Site;
  dooh: never;
  app: never;
}
export interface ContextWithApp extends AdCOMContext {
  site: never;
  dooh: never;
  app: App;
}

export interface ContextWithDooh extends AdCOMContext {
  site: never;
  dooh: Dooh;
  app: never;
}
