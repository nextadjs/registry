import type { BidderSpec } from "@/bidder/types";

const spec: BidderSpec = {
  openrtb: {
    v26: {
      configureRequestDetails: (params) => {
        return {
          endpoint: "https://example.com/endpoint",
        };
      },
      decorateBidRequest: async (bidRequest, params) => {
        return bidRequest;
      },
    },
  },
};

export default spec;
