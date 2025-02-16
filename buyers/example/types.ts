import type { DefaultParams } from "@/types";


// TODO: 広告ユニットとかの固有パラメーターの扱い

export interface Params extends DefaultParams {
  siteId: number;
  placement: string;
}