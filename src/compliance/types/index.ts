import type { DefaultParams } from "@/types";
import type { V26Bid, V26BidRequest, V26Imp } from "@/types/openrtb";

export type ComplianceConfig = {
  name: string;
  capabilities: ComplianceCapabilities;
};

export type Regulations = {
  coppa: boolean;
  gdpr: boolean;
  usPrivacy: string;
  gpp: string;
  gppSectionIds?: number[];
};

export type ComplianceCapabilities = {};

export type ComplianceSpec<
  TDefaultParams extends DefaultParams = DefaultParams
> = {
  openrtb: {
    v26: ComplianceOpenRTB2Spec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      TDefaultParams
    >;
  };
};

export type BuyerComplianceSpec<
  TDefaultParams extends DefaultParams = DefaultParams
> = {
  determineRestrictedSignals: (
    regulations: Regulations,
    params: TDefaultParams
  ) => Promise<string[]>;
};

export type SignalComplianceSpec<
  TDefaultParams extends DefaultParams = DefaultParams
> = {
  validate: (
    regulations: Regulations,
    params: TDefaultParams
  ) => Promise<boolean>;
};

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
