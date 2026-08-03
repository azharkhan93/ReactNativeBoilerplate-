export interface HeroSectionProps {
  readonly className?: string;
  readonly onSelectRecommendedPackage?: (
    packageId: string,
    addons: readonly string[],
  ) => void;
}
