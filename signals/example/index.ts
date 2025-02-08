import { Signal } from "@/signal";
import type { BidRequest } from "iab-openrtb/v26";

class UserSyncSignal extends Signal {
  public async collect(): Promise<void> {
    this.scheduleAsyncCollection("iframe", {
      url: "https://example.com",
      trigger: "load",
    });
  }

  public async decorateV26BidRequest(request: BidRequest): Promise<BidRequest> {
    return request;
  }
}

export default UserSyncSignal;
