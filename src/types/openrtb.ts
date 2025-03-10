import type {
  BidRequest as V26BaseBidRequest,
  Site as V26Site,
  Imp as V26BaseImp,
} from "iab-openrtb/v26";

export type OpenRTBVersion = "v2.6";

export type V26BidRequest =
  | V26SiteContextBidRequest
  | V26AppContextBidRequest
  | V26DoohContextBidRequest;
export interface V26Imp extends V26BaseImp {
  ext?: Record<string, unknown> & {
    gpid?: string;
    data?: {
      pbadslot?: string;
      adserver?: {
        name?: string;
        adslot?: string;
      };
    };
  };
}

export interface V26SiteContextBidRequest extends V26BaseBidRequest {
  app: never;
  dooh: never;
  site: V26Site;
  imp: V26Imp[];
}

export interface V26AppContextBidRequest extends V26BaseBidRequest {
  app: never;
  dooh: never;
  site: V26Site;
  imp: V26Imp[];
}

export interface V26DoohContextBidRequest extends V26BaseBidRequest {
  app: never;
  dooh: never;
  site: V26Site;
  imp: V26Imp[];
}

export type {
  BidResponse as V26BidResponse,
  Bid as V26Bid,
  SeatBid as V26SeatBid
} from "iab-openrtb/v26";
