import type { CustomParams } from "@/types";
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

export type ComplianceSpec<TCustomParams = unknown> = {
  openrtb: {
    v26: ComplianceOpenRTB2Spec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      TCustomParams
    >;
  };
};

export type BuyerComplianceSpec<TCustomParams = unknown> = {
  determineRestrictedSignals: (
    regulations: Regulations,
    params: TCustomParams
  ) => Promise<string[]>;
};

export type SignalComplianceSpec<TCustomParams = unknown> = {
  validate: (
    regulations: Regulations,
    params: TCustomParams
  ) => Promise<boolean>;
};

export interface ComplianceOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TCustomParams = CustomParams
> {
  validateBidRequest?(
    request: TReq,
    params: TCustomParams,
    regulations: Regulations
  ): Promise<TReq>;
  validateImpression?(
    impression: TImp,
    params: TCustomParams,
    regulations: Regulations
  ): Promise<TImp>;
  validateBidResponse?(
    response: TRes,
    params: TCustomParams,
    regulations: Regulations
  ): Promise<TRes>;
  validateBid?(
    bid: TBid,
    params: TCustomParams,
    regulations: Regulations
  ): Promise<TBid>;
}
