import type { BuyerSpec } from "@/buyer/types";
import type { CustomParams } from "./types";

const spec: BuyerSpec = {
  openrtb: {
    v26: {
      configureRequestDetails: (params: CustomParams) => {
        return {
          endpoint: "https://example.com/endpoint",
        };
      },
      decorateBidRequest: async (bidRequest, params: CustomParams) => {
        return bidRequest;
      },
    },
  },
};

export default spec;
