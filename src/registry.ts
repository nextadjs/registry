import type { Buyer } from "@/buyer";
import { Registry } from "@/core/registry";
import type { Signal } from "./signal";
import { Measurement } from "./measurement";
import { Compliance } from "./compliance";

export const buyerRegistry = new Registry<Buyer>();

export const signalRegistry = new Registry<Signal>();

export const measurementRegistry = new Registry<Measurement>();

export const complianceRegistry = new Registry<Compliance>();