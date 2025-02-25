import { Registry } from "@/core/registry";
import { Measurement } from "./measurement";
import { ComplianceRegistry } from "./compliance";
import { BuyerRegistry } from "./buyer";
import { SignalRegistry } from "./signal";

export const buyerRegistry = new BuyerRegistry();

export const signalRegistry = new SignalRegistry();

export const measurementRegistry = new Registry<Measurement>();

export const complianceRegistry = new ComplianceRegistry();
