import type { DefaultParams } from "@/types";
import type { Regulations } from ".";
import type {
  V26AppContextBidRequest,
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26DoohContextBidRequest,
  V26Imp,
  V26SiteContextBidRequest,
} from "@/types/openrtb";

export interface ComplianceSpec<TParams extends DefaultParams = DefaultParams> {
  openrtb?: ComplianceOpenRTBSpec<TParams, V26BidRequest>;
  site?: ComplianceMediaContextSpec<TParams, V26SiteContextBidRequest>;
  app?: ComplianceMediaContextSpec<TParams, V26AppContextBidRequest>;
  dooh?: ComplianceMediaContextSpec<TParams, V26DoohContextBidRequest>;
}

export interface ComplianceOpenRTBSpec<
  TParams extends DefaultParams,
  TV26BidRequest extends V26BidRequest
> {
  v26?: ComplianceOpenRTB2Spec<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TParams
  >;
}

export interface ComplianceMediaContextSpec<
  TParams extends DefaultParams,
  TV26BidRequest extends V26BidRequest
> {
  openrtb?: ComplianceOpenRTBSpec<TParams, TV26BidRequest>;
}

export interface BuyerComplianceSpec<
  TDefaultParams extends DefaultParams = DefaultParams
> {
  determineRestrictedSignals: (
    regulations: Regulations,
    params: TDefaultParams
  ) => Promise<string[]>;
}

export interface SignalComplianceSpec<
  TDefaultParams extends DefaultParams = DefaultParams
> {
  validate: (
    regulations: Regulations,
    params: TDefaultParams
  ) => Promise<boolean>;
}

export interface ComplianceOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TDefaultParams = DefaultParams
> {
  validateBidRequest?(
    request: TReq,
    params: TDefaultParams,
    regulations: Regulations
  ): Promise<TReq>;
  validateImpression?(
    impression: TImp,
    params: TDefaultParams,
    regulations: Regulations
  ): Promise<TImp>;
  validateBidResponse?(
    response: TRes,
    params: TDefaultParams,
    regulations: Regulations
  ): Promise<TRes>;
  validateBid?(
    bid: TBid,
    params: TDefaultParams,
    regulations: Regulations
  ): Promise<TBid>;
}
