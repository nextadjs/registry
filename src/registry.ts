import type { Buyer } from "@/buyer";
import { Registry } from "@/core/registry";
import type { ClientSignal, ServerSignal } from "./signal";
import { Measurement } from "./measurement";
import { Compliance } from "./compliance";

export const buyerRegistry = new Registry<Buyer>();

export const signalRegistry = new Registry<ClientSignal | ServerSignal>();

export const measurementRegistry = new Registry<Measurement>();

export const complianceRegistry = new Registry<Compliance>();
