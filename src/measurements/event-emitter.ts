import type {
  EventData,
  MeasurementEvent,
  MeasurementEventMap,
  MeasurementEventType,
} from "./types/event";

export class EventEmitter {
  private listeners: Map<
    MeasurementEventType,
    Set<(event: MeasurementEvent<any>) => void>
  > = new Map();

  public addEventListener<T extends MeasurementEventType>(
    eventType: T,
    listener: (data: MeasurementEventMap[T]) => void
  ): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(listener);
  }

  public removeEventListener<T extends MeasurementEventType>(
    eventType: T,
    listener: (data: MeasurementEventMap[T]) => void
  ): void {
    const eventListeners = this.listeners.get(eventType);
    if (eventListeners) {
      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(eventType);
      }
    }
  }

  public emit<T extends MeasurementEventType>(
    eventType: T,
    data?: EventData<T>
  ): void {
    const event: MeasurementEventMap[T] = {
      type: eventType,
      timestamp: Date.now(),
      data,
    } as MeasurementEventMap[T];

    const eventListeners = this.listeners.get(eventType);
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(event);
      });
    }
  }
}

export const eventEmitter = new EventEmitter();