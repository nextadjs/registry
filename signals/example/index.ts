import { loadSignal } from "@/signal";
import { signalRegistry } from "@/index";
import config from "./signal.json";

signalRegistry.register(config.name, loadSignal);