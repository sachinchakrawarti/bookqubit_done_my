"use client";

import HeroSectionSlider from "@/components/homepages/HeroSectionSlider";
import HeroPartOne from "@/components/homepages/HeroPartOne";
import ExploreBooks from "@/components/homepages/ExploreBooks";
import ExploreCollections from "@/components/homepages/ExploreCollections";
import ExploreAuthor from "@/components/homepages/ExploreAuthor";
import ExplorePublications from "@/components/homepages/ExplorePublications";
import ExploreComics from "@/components/homepages/ExploreComics";
import ExploreAcademicBooks from "@/components/homepages/ExploreAcademicBooks";
import ThirdPartyAD from "@/components/homepages/ThirdPartyAD";
import QuickActions from "@/components/homepages/QuickActions";
import LaunchYourBook from "@/components/homepages/LunchYourBook";
import DiscoveryPlatform from "@/components/homepages/DiscoveryPlatform";
import AiTools from "@/components/homepages/AiTools";
import TrendDashboardSlider from "@/components/homepages/trend_dashboard_slider";
import TagsHome from "@/components/homepages/TagsHome";
import HeroSectionSlider_mobile from "@/components/homepages/mobile_homepages/HeroSectionSlider_mobile";
import BookQubit_Mobile from "@/components/homepages/mobile_homepages/BookQubit_Mobile";

export default function HomepagesPage() {
  return (
    <main>
      {/* Mobile Only - Hidden on PC */}
      <div className="block md:hidden">
        <HeroSectionSlider_mobile />
        <BookQubit_Mobile />
      </div>

      {/* PC Only - Hidden on Mobile */}
      <div className="hidden md:block">
        <HeroSectionSlider />
      </div>

      {/* Visible on Both Mobile and PC */}
      <TrendDashboardSlider />

      {/* Hidden Components (Commented) */}
      {/* <TagsHome /> */}
      {/* <ThirdPartyAD /> */}
      
      {/* Visible on Both */}
      <HeroPartOne />
      <QuickActions />
      <ExploreBooks />
      <ExploreAcademicBooks />
      <ExploreCollections />
      <ExploreAuthor />
      <ExplorePublications />
      <ExploreComics />
      
      {/* Hidden Components (Commented) */}
      {/* <LaunchYourBook />
      <AiTools /> */}
    </main>
  );
}