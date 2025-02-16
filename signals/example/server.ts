import type { ServerSignalSpec } from "@/signal/types";
import type { Data, Params } from "./types";

const spec: ServerSignalSpec<Params, Data> = {
  collect: async () => {
    return {
      data: 'hello, world!',
      asyncCollections: [],
    };
  },
  openrtb: {
    v26: {
      decorateBidRequest: async (bidRequest, params, data) => {
        bidRequest.user = {
          ...bidRequest.user,
          id: data
        };
        return bidRequest;
      },
    },
  },
};

export default spec;
