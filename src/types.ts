export type Language = 'ar' | 'en';

export interface CompanyCredential {
  id: string;
  keyName: string;
  titleAr: string;
  titleEn: string;
  statusAr: string;
  statusEn: string;
  numberPlaceholderAr: string;
  numberPlaceholderEn: string;
  currentValue?: string;
  category: 'commercial' | 'defense' | 'tax' | 'standards';
  authorityAr: string;
  authorityEn: string;
  noteAr: string;
  noteEn: string;
  badgeType: 'pending' | 'verified' | 'standard';
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  fullDescAr: string;
  fullDescEn: string;
  iconName: string;
  featuresAr: string[];
  featuresEn: string[];
  standardsAr: string[];
  standardsEn: string[];
  tagAr: string;
  tagEn: string;
}

export interface MethodologyStep {
  stepNumber: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  deliverablesAr: string[];
  deliverablesEn: string[];
  iconName: string;
}
