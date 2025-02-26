import type { Runtime } from "@/types";
import type { AdCOMContext } from "@/types/adcom";

export interface MeasurementEvent<T1 = null> {
  type: MeasurementEventType;
  timestamp: number;
  runtime: Runtime | 'both';
  context: AdCOMContext,
  data: T1;
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
  