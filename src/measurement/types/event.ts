import type { Runtime } from "@/types";
import type { AdCOMContext } from "@/types/adcom";

export interface MeasurementEvent<T1 = null> {
  type: MeasurementEventType;
  timestamp: number;
  runtime: Runtime | "both";
  context: AdCOMContext;
  data: T1;
}

export type ClientMeasurementEventMap = {
  "window:load": MeasurementEvent<MouseEvent>;

  "document:visibilitychange": MeasurementEvent<Event>;
  "document:DOMContentLoaded": MeasurementEvent<Event>;
};

export type MeasurementEventMap = ClientMeasurementEventMap;

export type MeasurementEventType = keyof MeasurementEventMap;

export type EventData<T extends MeasurementEventType> =
  MeasurementEventMap[T]["data"];
