import NavbarMain from "@/components/Navbar";
import Head from "next/head";
//import HeroSection from "@/components/Hero";
import dynamic from "next/dynamic";
import TableHome from "@/components/Table";

const HeroSection = dynamic(() => import("@/components/Hero"), { ssr: false });
export default function Home() {
  return (
    <>
      <Head>
        <title>Bedao | Celestia Mainnet</title>
      </Head>
      <NavbarMain />
      <HeroSection />
      <TableHome />
    </>
  );
}
