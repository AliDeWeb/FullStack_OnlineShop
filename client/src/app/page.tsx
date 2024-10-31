import type { Metadata } from "next";

import Link from "next/link";

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

// Data
const images = [
  { link: "/", src: "/banners/home-page/02.png" },
  { link: "/", src: "/banners/home-page/01.png" },
];
const NavbarItems: { link: string; title: string }[] = [
  { link: "/products", title: "for men" },
  { link: "/products", title: "for women" },
  { link: "/products", title: "for all" },
  { link: "/products", title: "for children" },
];
const products = [
  {
    title: "Canvas Shoes for Boy",
    cover: "/images/products/01.jpg",
    price: 25.0,
    rate: 4,
    link: "/",
    discount: 20,
  },
  {
    title: "Round Neck T-Shirt",
    cover: "/images/products/02.jpg",
    price: 27.0,
    rate: 3,
    link: "/",
    discount: 20,
  },
  {
    title: "Cute Baby Toy's",
    cover: "/images/products/03.jpg",
    price: 40,
    rate: 5,
    link: "/",
    discount: 50,
  },
  {
    title: "Canvas Cowboy Hat",
    cover: "/images/products/04.jpg",
    price: 12,
    rate: 5,
    link: "/",
    discount: 80,
  },
  {
    title: "Digital Smart Watches",
    cover: "/images/products/05.jpg",
    price: 100,
    rate: 2,
    link: "/",
    discount: 20,
  },
  {
    title: "Leather Belt for Men",
    cover: "/images/products/06.jpg",
    price: 15,
    rate: 4,
    link: "/",
    discount: 38,
  },
];

export default function Home() {
  return (
    <div>
      <BannerSlider images={images} slidesPerView={1} spaceBetween={1} />
      <SectionWrapper
        description="Browse The Collection of Top Products"
        title="Our Top Collection"
      >
        <div className="container">
          <Navbar items={NavbarItems} />

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
