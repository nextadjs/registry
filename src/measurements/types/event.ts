export interface MeasurementEvent<T = Record<string, unknown>> {
  type: MeasurementEventType;
  timestamp: number;
  data: T;
}

export interface MeasurementEventMap {
  init: MeasurementEvent<void>;
}

export type MeasurementEventType = keyof MeasurementEventMap;

export type EventData<T extends MeasurementEventType> = MeasurementEventMap[T]['data'];
