import type { BuyerClientIntegration } from "@/buyer";
import type { DefaultParams } from "@/types";

interface Params extends DefaultParams {
    site: number;
};

const integration: BuyerClientIntegration<Params> = {

};

export default integration;