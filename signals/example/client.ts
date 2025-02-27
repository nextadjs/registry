import type { SignalClientIntegration } from "@/signal";
import type { DefaultParams } from "@/types";

interface Params extends DefaultParams {
  site: number;
}

interface Data {
  hello: "world!";
}

const integration: SignalClientIntegration<Data, Params> = {
  async collect() {
    return {
      data: {
        hello: "world!",
      },
      asyncCollections: [],
    };
  },
};

export default integration;
