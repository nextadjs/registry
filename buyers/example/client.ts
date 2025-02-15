import type { ClientBuyerSpec } from "@/buyer/types";
import type { Params } from "./types";

const spec: ClientBuyerSpec<Params> = {
  signals: [
    {
      name: "user-sync",
      spec: {
        collect: async (params) => {
          return {
            data: null,
            asyncCollections: [
              {
                type: "iframe",
                url: "https://example.com/url",
                trigger: "idle",
              },
            ],
          };
        },
      },
    },
  ],
  openrtb: {
    v26: {
      configureRequestDetails: (params) => {
        return {
          url: "https://example.com/endpoint",
        };
      },
      decorateBidRequest: async (bidRequest, params) => {
        return bidRequest;
      },
    },
  },
};

export default spec;
