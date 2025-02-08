export type CustomParams = CommonParams & SpecificParams;

export type CommonParams = {
  siteId: number;
};

export type SpecificParams = {
  placementId: number;
};
