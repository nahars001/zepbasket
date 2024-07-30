import React from "react";
import HeroSection from "../../components/user/HeroSection";
import Products from "../../components/user/ProductsItems";
import HomeBanner from "../../components/user/HomeBanner";
import HomeBanner2 from "../../components/user/HomeBanner2";
import { useGetProductQuery } from "../../redux/api/ProductAPI";
import MetaData from "../../components/MetaData";

const Home = () => {
  const { data, isError, isLoading } = useGetProductQuery();
  return (
    <div>
      <MetaData pageName={"Home"} />
      <HeroSection />
      <HomeBanner />
      <Products productData={data?.product} isLoading={isLoading} title={"Top Product"} />
      <HomeBanner2 />
      <Products productData={data?.product} isLoading={isLoading} title={"Top Product"} />
    </div>
  );
};

export default Home;
