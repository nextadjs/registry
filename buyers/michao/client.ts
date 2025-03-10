import type { BuyerClientIntegration } from "@/buyer";
import type { Params } from "./types";

const integration: BuyerClientIntegration<Params> = {
  channel: {
    site: {
      openrtbV26: {
        configureRequest(params, context) {
          return {
            url: "https://rtb.michao-ssp.com/openrtb/prebid",
          };
        },
        decorateBidRequest(bidRequest, params, context) {
          bidRequest.site.ext = {
            michao: {
              site: params.site.toString(),
            },
          };

          bidRequest.test = 1;

          return bidRequest;
        },
        decorateImpression(impression, bidRequest, params, context) {
          impression.ext = {
            michao: {
              placement: params.placement,
            },
          };

          return impression;
        },
      },
    },
  },
};

export default integration;
