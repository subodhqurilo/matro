import Image from "next/image";
import Hero from "../components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import SuccessStories from "@/components/SuccessStories";
import MobileApp from "@/components/MobileApp";

export default function Home() {
  return (
  <div>
    <Hero />
    <WhyChooseUs />
    <SuccessStories />
    <MobileApp />
  </div>
  );
}
