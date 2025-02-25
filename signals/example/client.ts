import type { SignalClientIntegration } from "@/signal";
import type { DefaultParams } from "@/types";

interface Params extends DefaultParams {
    site: number;
};

const integration: SignalClientIntegration<Params> = {

};

export default integration;