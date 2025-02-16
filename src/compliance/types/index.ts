export type Regulations = {
  coppa: boolean;
  gdpr: boolean;
  usPrivacy: string;
  gpp: string;
  gppSectionIds?: number[];
};

export * from './spec';
export * from './config';
