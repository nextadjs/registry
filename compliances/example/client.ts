import type { ComplianceClientIntegration } from "@/compliance";
import type { DefaultParams } from "@/types";

interface Params extends DefaultParams {
    site: number;
};

const integration: ComplianceClientIntegration<Params> = {

};

export default integration;