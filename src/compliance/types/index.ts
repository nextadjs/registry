import type { CustomParams } from "@/types";
import type { V26Bid, V26BidRequest, V26Imp } from "@/types/openrtb";

export type ComplianceConfig = {
  name: string;
  capabilities: ComplianceCapabilities;
};

export type ComplianceCapabilities = {};

export interface ComplianceOpenRTBSpec<TReq, TImp, TRes, TBid, TCustomParams = CustomParams> {
  validateBidRequest?(request: TReq, params: TCustomParams): Promise<TReq>;
  validateImpression?(impression: TImp, params: TCustomParams): Promise<TImp>;
  validateBidResponse?(response: TRes, params: TCustomParams): Promise<TRes>;
  validateBid?(bid: TBid, params: TCustomParams): Promise<TBid>;
}

export type ComplianceSpec = {
  openrtb: {
    v26: ComplianceOpenRTBSpec<
      V26BidRequest,
      V26Imp,
      V26BidRequest,
      V26Bid,
      CustomParams
    >;
  };
};
