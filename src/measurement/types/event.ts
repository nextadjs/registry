import type { Runtime } from "@/types";

export interface MeasurementEvent<T = Record<string, unknown>> {
  type: MeasurementEventType;
  timestamp: number;
  runtime: Runtime | 'both';
  data: T;
}

export interface MeasurementEventMap {
  init: MeasurementEvent<void>;
  'window:resize': MeasurementEvent<UIEvent>;
  'window:scroll': MeasurementEvent<Event>;
  'window:mousedown': MeasurementEvent<MouseEvent>;

  'document:visibilitychange': MeasurementEvent<Event>;
  'document:DOMContentLoaded': MeasurementEvent<Event>;
}

export type MeasurementEventType = keyof MeasurementEventMap;

export type EventData<T extends MeasurementEventType> =
  MeasurementEventMap[T]["data"];
  