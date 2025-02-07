import type { BidderSpec } from "@/bidder/types";

const spec: BidderSpec = {
  v26: {
    decorateRequest: async (request) => {
      return request;
    },
    decorateResponse: async (response) => {
      return response;
    },
  },
};

export default spec;
