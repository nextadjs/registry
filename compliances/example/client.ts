import type { CustomParams } from "./types";
import type { ComplianceSpec } from "@/compliance/types";

const spec: ComplianceSpec = {
  openrtb: {
    v26: {
      validateBidRequest: async (bidRequest, params: CustomParams) => {
        bidRequest.bcat = [...(bidRequest.bcat || []), 'IAB25-4', 'IAB25-5']
        return bidRequest;
      },
    },
  },
};

export default spec;
