import type { Runtime } from "@/types";
import type { BuyerSpec } from "./types";
import { Buyer } from "./buyer";

export const loadBuyer = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  const spec = (await import(`@buyers/${name}/${runtime}`)).default as BuyerSpec;
  const config = await import(`@buyers/${name}/buyer.json`);
  return new Buyer(config, spec);
};
