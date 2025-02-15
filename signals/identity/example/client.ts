import type { ClientSignalSpec } from "@/signal/types";
import type { Data, Params } from "./types";

const spec: ClientSignalSpec<Params, Data> = {
  collect: async () => {
    return {
      data: null,
      asyncCollections: [],
    };
  },
  openrtb: {
    v26: {
      decorateBidRequest: async (bidRequest, params: Params) => {
        return bidRequest;
      },
    },
  },
};

export default spec;
