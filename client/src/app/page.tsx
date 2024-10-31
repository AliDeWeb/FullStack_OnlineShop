import type { Metadata } from "next";

// Components
import { BannerSlider } from "@/components/BannerSlider/BannerSlider.component";
import { Navbar } from "@/components/Navbar/Navbar.component";
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
const NavbarItems: { link: string; title: string }[] = [
  { link: "/?products=all", title: "for all" },
  { link: "/?products=men", title: "for men" },
  { link: "/?products=women", title: "for women" },
  { link: "/?products=children", title: "for children" },
];

export default function Home() {
  return (
    <div>
      <BannerSlider images={images} slidesPerView={1} spaceBetween={1} />
      <SectionWrapper
        description="Browse The Collection of Top Products"
        title="Our Top Collection"
      >
        <div>
          <Navbar items={NavbarItems} />
        </div>
      </SectionWrapper>
    </div>
  );
}
