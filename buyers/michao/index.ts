import { loadBuyer } from "@/buyer";
import { buyerRegistry } from "@/index";
import config from "./buyer.json";

buyerRegistry.register(config.name, loadBuyer);