export type CollectResult<T, A> = {
  data: T;
  asyncCollections: Omit<A, "status">[];
};

export type AsyncCollect = ServerAsyncCollect | ClientAsyncCollect;
export type ServerAsyncCollect = SimpleAsyncCollect;
export type ClientAsyncCollect = SimpleAsyncCollect | CustomAsyncCollect;

export interface BaseAsyncCollect {
  type: string;
  status: boolean;
  trigger: AsyncCollectTrigger;
}

export interface SimpleAsyncCollect extends BaseAsyncCollect {
  type: "iframe" | "script" | "pixel";
  timeout?: number;
  url: string;
  position?: "head" | "body";
}

export interface CustomAsyncCollect extends BaseAsyncCollect {
  type: "custom";
  handle: () => Promise<void>;
}

export type AsyncCollectTrigger =
  | "immediate"
  | "load"
  | "idle"
  | "DOMContentLoaded";
