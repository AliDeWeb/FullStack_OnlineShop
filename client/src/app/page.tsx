import type { Metadata } from "next";

import Link from "next/link";

// Data
import { images, products, ProductsNavbarItems } from "@/db/db";

// Components
import { BannerSlider } from "@/components/BannerSlider/BannerSlider.component";
import { Navbar } from "@/components/Navbar/Navbar.component";
import { ProductsSection } from "@/components/ProductsSection/ProductsSection.component";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper.component";
import { ChevronRight } from "lucide-react";

// Metadata
export const metadata: Metadata = {
  title: "Ekka - Home",
};

export default function Home() {
  return (
    <div>
      <BannerSlider images={images} slidesPerView={1} spaceBetween={1} />
      <SectionWrapper
        description="Browse The Collection of Top Products"
        title="Our Top Collection"
      >
        <div className="container">
          <Navbar items={ProductsNavbarItems} />

          <ProductsSection products={products} />
          <div className="flex items-center justify-center">
            <Link
              className="inline-flex items-center gap-1 font-montserrat text-sm font-bold text-[#777777] transition-all hover:scale-105"
              href="/products"
            >
              Explore the shop
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
