import type { useAnimationControls, MotionValue } from "framer-motion";

type CaseTitleAnimationControls = ReturnType<typeof useAnimationControls>;

export type CaseStudyImage = Readonly<{
  src: string;
  alt: string;
}>;

export type CaseStudyVideo = Readonly<{
  src: string;
  poster?: string;
}>;

export type CaseStudy = Readonly<{
  id: string;
  title: string;
  href: string;
  image?: CaseStudyImage;
  video?: CaseStudyVideo;
}>;

export type CaseGalleryProps = Readonly<{
  items: readonly CaseStudy[];
}>;

export type CaseCardProps = Readonly<{
  caseStudy: CaseStudy;
  scrollScale: MotionValue<number>;
  preload?: boolean;
  duplicate?: boolean;
}>;

export type AnimatedCaseTitleProps = Readonly<{
  title: string;
  controls: CaseTitleAnimationControls;
}>;

export type CaseCardMediaProps = Readonly<{
  image?: CaseStudyImage;
  video?: CaseStudyVideo;
  preload?: boolean;
}>;
