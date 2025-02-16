

import type {
  BidRequest as V26BidRequest,
  Site as V26Site,
} from "iab-openrtb/v26";

export type OpenRTBVersion = "v2.6";

export interface V26SiteContextBidRequest extends V26BidRequest {
  app: never;
  dooh: never;
  site: V26Site;
}

export interface V26AppContextBidRequest extends V26BidRequest {
  app: never;
  dooh: never;
  site: V26Site;
}

export interface V26DoohContextBidRequest extends V26BidRequest {
  app: never;
  dooh: never;
  site: V26Site;
}

export type {
  BidResponse as V26BidResponse,
  Bid as V26Bid,
  BidRequest as V26BidRequest,
  Imp as V26Imp,
} from "iab-openrtb/v26";
