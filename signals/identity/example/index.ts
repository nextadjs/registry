import { Identity } from "@/signal";
import type { BidRequest } from "iab-openrtb/v26";

type Options = {
  syncType: "iframe" | "pixel";
};

class UserSync extends Identity {
  public async collect(options: Options): Promise<void> {
    if (options.syncType === "iframe") {
      this.scheduleAsyncCollection("iframe", {
        url: "https://example.com/iframe",
        trigger: "load",
      });
    }

    if (options.syncType === "pixel") {
      this.scheduleAsyncCollection("pixel", {
        url: "https://example.com/iframe",
        trigger: "load",
      });
    }
  }

  public async decorateV26BidRequest(request: BidRequest): Promise<BidRequest> {
    return request;
  }
}

export default UserSync;
