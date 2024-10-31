import type { Metadata } from "next";

// Components
import { BannerSlider } from "@/components/BannerSlider/BannerSlider.component";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper.component";

// Metadata
export const metadata: Metadata = {
  title: "Ekka - Home",
};

// Data
const images = [
  { link: "/", src: "/banners/home-page/02.png" },
  { link: "/", src: "/banners/home-page/01.png" },
];

export default function Home() {
  return (
    <div>
      <BannerSlider images={images} slidesPerView={1} spaceBetween={1} />
      <SectionWrapper
        description="Browse The Collection of Top Products"
        title="Our Top Collection"
      >
        <div></div>
      </SectionWrapper>
    </div>
  );
}
