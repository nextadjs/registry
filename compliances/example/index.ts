import { loadCompliance} from "@/compliance";
import { complianceRegistry } from "@/index";
import config from "./compliance.json";

complianceRegistry.register(config.name, (runtime) =>
  loadCompliance(config.name, runtime)
);
