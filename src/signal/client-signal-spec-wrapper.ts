import type { DefaultParams } from "@/types";
import type { AdCOMContext } from "@/types/adcom";
import type {
  ClientAsyncCollect,
  ClientSignalSpec,
  SignalCollect,
  SignalConfig,
  SignalOpenRTB2Spec,
  SignalUserConfig,
} from "./types";
import type {
  SignalOpenRTB2SpecWrapper,
  SignalOpenRTBSpecWrap,
  SignalSpecWrapper,
} from "./types/spec-wrapper";
import type {
  V26Bid,
  V26BidRequest,
  V26BidResponse,
  V26Imp,
} from "@/types/openrtb";

export class ClientSignalSpecWrapper<
  TParams extends DefaultParams = DefaultParams,
  TData = unknown,
  TContext extends AdCOMContext = AdCOMContext
> implements SignalSpecWrapper<ClientAsyncCollect, TData>
{
  public constructor(
    private readonly _userConfig: SignalUserConfig<TParams>,
    private readonly _spec: ClientSignalSpec<TParams, TData, TContext>,
    private readonly _data: TData
  ) {}

  public openrtb(context: TContext) {
    const specWrap: SignalOpenRTBSpecWrap<TData, V26BidRequest> = {};
    const { openrtb } = this._spec;

    if (openrtb?.v26) {
      specWrap.v26 = this.makeOpenRTB26SpecWrapper(openrtb.v26, context);
    }

    return specWrap;
  }

  private makeOpenRTB26SpecWrapper<
    TReq extends V26BidRequest,
    TImp extends V26Imp,
    TRes extends V26BidResponse,
    TBid extends V26Bid
  >(
    spec: SignalOpenRTB2Spec<TReq, TImp, TRes, TBid, any, TData, AdCOMContext>,
    context: TContext
  ): SignalOpenRTB2SpecWrapper<TReq, TImp, TRes, TBid, TData> {
    const contextSpec = this.getContextSpecificOpenRTB(context)?.v26;

    return {
      decorateBidRequest: async (request: TReq): Promise<TReq> => {
        if (contextSpec?.decorateBidRequest) {
          return (await contextSpec.decorateBidRequest(
            request as any,
            this._userConfig.params,
            this._data,
            context as any
          )) as TReq;
        }

        if (spec?.decorateBidRequest) {
          return await spec.decorateBidRequest(
            request,
            this._userConfig.params,
            this._data,
            context
          );
        }
        return request;
      },

      decorateImpression: async (impression: TImp) => {
        if (contextSpec?.decorateImpression) {
          return (await contextSpec.decorateImpression(
            impression as any,
            this._userConfig.params,
            this._data,
            context as any
          )) as TImp;
        }

        if (spec?.decorateImpression) {
          return await spec.decorateImpression(
            impression,
            this._userConfig.params,
            this._data,
            context
          );
        }
        return impression;
      },

      decorateBidResponse: async (response: TRes) => {
        if (contextSpec?.decorateBidResponse) {
          return (await contextSpec.decorateBidResponse(
            response as any,
            this._userConfig.params,
            this._data,
            context as any
          )) as TRes;
        }

        if (spec?.decorateBidResponse) {
          return await spec.decorateBidResponse(
            response,
            this._userConfig.params,
            this._data,
            context
          );
        }
        return response;
      },

      decorateBid: async (bid: TBid) => {
        if (contextSpec?.decorateBid) {
          return (await contextSpec.decorateBid(
            bid as any,
            this._userConfig.params,
            this._data,
            context as any
          )) as TBid;
        }

        if (spec?.decorateBid) {
          return await spec.decorateBid(
            bid,
            this._userConfig.params,
            this._data,
            context
          );
        }
        return bid;
      },
    };
  }

  private getContextSpecificOpenRTB(context: TContext) {
    if ("site" in context && this._spec.site?.openrtb) {
      return this._spec.site.openrtb;
    }
    if ("app" in context && this._spec.app?.openrtb) {
      return this._spec.app.openrtb;
    }
    if ("dooh" in context && this._spec.dooh?.openrtb) {
      return this._spec.dooh.openrtb;
    }
  }
}
