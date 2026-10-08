"use client";

import React from "react";
import { RocketAssemblySection, RocketAssemblySectionProps } from "./RocketAssemblySection";

export type BrandingRocketHeroProps = RocketAssemblySectionProps;

export const BrandingRocketHero: React.FC<BrandingRocketHeroProps> = (props) => {
  return <RocketAssemblySection {...props} />;
};

export default BrandingRocketHero;
