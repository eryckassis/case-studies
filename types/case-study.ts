export type CaseStudyImage = Readonly<{
  src: string;
  alt: string;
}>;

export type CaseStudy = Readonly<{
  id: string;
  title: string;
  href: string;
  image: CaseStudyImage;
}>;

export type CaseGalleryProps = Readonly<{
  items: readonly CaseStudy[];
}>;

export type CaseCardProps = Readonly<{
  caseStudy: CaseStudy;
  preload?: boolean;
}>;

export type CaseCardMediaProps = Readonly<
  CaseStudyImage & {
    preload?: boolean;
  }
>;
