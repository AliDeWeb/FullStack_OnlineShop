import type { Metadata } from "next";

// Components
import { BannerSlider } from "@/components/BannerSlider/BannerSlider.component";
import { Navbar } from "@/components/Navbar/Navbar.component";
import { ProductsSection } from "@/components/ProductsSection/ProductsSection.component";
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
        </div>
      </SectionWrapper>
    </div>
  );
}
