import type { App, Context, Dooh, Site } from "iab-adcom/context";



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
