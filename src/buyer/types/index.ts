import type { DefaultParams } from "@/types";
import type { ClientBuyer } from "../client-buyer";
import type { ServerBuyer } from "../server-buyer";

export type Buyer<P extends DefaultParams> = ClientBuyer<P> | ServerBuyer<P>;

export * from "./integration";
export * from "./config";
