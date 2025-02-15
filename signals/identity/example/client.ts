import type { ClientSignalSpec } from "@/signal/types";
import type { Options } from "./types";

const spec: ClientSignalSpec = {
  collect: async () => {
    return {
      data: null,
      asyncCollections: [],
    };
  },
  openrtb: {
    v26: {
      decorateBidRequest: async (bidRequest, params: Options) => {
        return bidRequest;
      },
    },
  },
};

export default spec;
