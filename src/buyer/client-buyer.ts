import type { DefaultParams } from "@/types";
import { Buyer } from "./buyer";
import type { BuyerConfig, BuyerUserConfig, ClientBuyerSpec } from "./types";
import type { ClientBuyerSpecWrapper as IClientBuyerSpecWrapper } from "./types/spec-wrapper";
import { ClientBuyerSpecWrapper } from "./client-buyer-spec-wrapper";

export class ClientBuyer<TParams extends DefaultParams> extends Buyer<
  TParams,
  ClientBuyerSpec,
  IClientBuyerSpecWrapper
> {
  protected specWrapper: ClientBuyerSpecWrapper<TParams>;

  public constructor(
    config: BuyerConfig,                                                               
    userConfig: BuyerUserConfig<TParams>,
    spec: ClientBuyerSpec
  ) {
    super(config, userConfig, spec);
    this.specWrapper = new ClientBuyerSpecWrapper(config, userConfig, spec);
  }
}
