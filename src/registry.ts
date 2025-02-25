import { Registry } from "@/core/registry";
import type { Signal } from "./signal";
import { Measurement } from "./measurement";
import { Compliance } from "./compliance";
import { BuyerRegistry } from "./buyer";

export const buyerRegistry = new BuyerRegistry();

export const signalRegistry = new Registry<Signal>();

export const measurementRegistry = new Registry<Measurement>();

export const complianceRegistry = new Registry<Compliance>();
