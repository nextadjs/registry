import { ComplianceRegistry } from "./compliance";
import { BuyerRegistry } from "./buyer";
import { SignalRegistry } from "./signal";
import { MeasurementRegistry } from "./measurement";

export const buyerRegistry = new BuyerRegistry();

export const signalRegistry = new SignalRegistry();

export const measurementRegistry = new MeasurementRegistry();

export const complianceRegistry = new ComplianceRegistry();
