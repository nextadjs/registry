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
          url: "https://rtb.michao-ssp.com/openrtb/prebid",
        };
      },
      decorateBidRequest: async (bidRequest, params) => {
        // オブジェクト操作のユーティリティあると便利だよ~
        bidRequest.site = {
          domain: bidRequest.site?.domain,
          ext: {
            michao: {
              site: params.siteId.toString(),
            },
          },
        };
        return bidRequest;
      },
      decorateImpression: async (impression, params) => {
        impression = {
          ...impression,
          ext: {
            michao: {
              placement: params.placement,
            },
          },
        };

        return impression;
      },
    },
  },
};

export default spec;
