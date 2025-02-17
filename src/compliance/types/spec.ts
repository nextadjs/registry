import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
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

export interface ComplianceSpec<
  TParams extends DefaultParams = DefaultParams,
  TContext extends AdCOMContext = AdCOMContext
> {
  openrtb?: ComplianceOpenRTBSpec<TParams, TContext, V26BidRequest>;
  site?: ComplianceMediaContextSpec<TParams, TContext, V26SiteContextBidRequest>;
  app?: ComplianceMediaContextSpec<TParams, TContext, V26AppContextBidRequest>;
  dooh?: ComplianceMediaContextSpec<TParams, TContext, V26DoohContextBidRequest>;
}

export interface ComplianceOpenRTBSpec<
  TParams extends DefaultParams,
  TContext extends AdCOMContext,
  TV26BidRequest extends V26BidRequest
> {
  v26?: ComplianceOpenRTB2Spec<
    TV26BidRequest,
    V26Imp,
    V26BidResponse,
    V26Bid,
    TParams,
    TContext
  >;
}

export interface ComplianceMediaContextSpec<
  TParams extends DefaultParams,
  TContext extends AdCOMContext,
  TV26BidRequest extends V26BidRequest
> {
  openrtb?: ComplianceOpenRTBSpec<TParams, TContext, TV26BidRequest>;
}

export interface BuyerComplianceSpec<
  TParams extends DefaultParams = DefaultParams,
  TContext extends AdCOMContext = AdCOMContext
> {
  determineRestrictedSignals: (
    regulations: Regulations,
    params: TParams,
    context: TContext
  ) => Promise<string[]>;
}

export interface SignalComplianceSpec<
  TParams extends DefaultParams = DefaultParams,
  TContext extends AdCOMContext = AdCOMContext
> {
  validate: (
    regulations: Regulations,
    params: TParams,
    context: TContext
  ) => Promise<boolean>;
}

export interface ComplianceOpenRTB2Spec<
  TReq,
  TImp,
  TRes,
  TBid,
  TParams extends DefaultParams = DefaultParams,
  TContext extends AdCOMContext = AdCOMContext
> {
  validateBidRequest?(
    request: TReq,
    params: TParams,
    regulations: Regulations,
    context: TContext
  ): Promise<TReq>;
  validateImpression?(
    impression: TImp,
    params: TParams,
    regulations: Regulations,
    context: TContext
  ): Promise<TImp>;
  validateBidResponse?(
    response: TRes,
    params: TParams,
    regulations: Regulations,
    context: TContext
  ): Promise<TRes>;
  validateBid?(
    bid: TBid,
    params: TParams,
    regulations: Regulations,
    context: TContext
  ): Promise<TBid>;
}