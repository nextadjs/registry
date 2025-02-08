import type { BidderSpec } from "@/bidder/types";
import type { CustomParams } from "./types";

const spec: BidderSpec = {
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
