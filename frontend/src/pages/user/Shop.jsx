import React, { useEffect } from "react";
import Breadcrumb from "../../components/user/Breadcrumb";
import ShopProduct from "../../components/user/ShopProduct";
import ShopRatingFilter from "../../components/user/ShopRatingFilter";
import ShopPriceFliter from "../../components/user/ShopPriceFliter";
import ShopCategoryFilter from "../../components/user/ShopCategoryFilter";
import MetaData from "../../components/MetaData";

const Shop = () => {
 

  return (
    <div>
      <MetaData pageName={"Shop"} />
      <Breadcrumb
        breadcrumbTitle={"Shop"}
        breadcrumbLink1={"/shop"}
        breadcrumbLink1Text={"Shop"}
      />
      <div className="container">
        <div className="row pt-4 pb-4">
          <div className="col-md-3">
            <p className="fs-3 mb-0">Filter</p>
            <div className="p-2 mt-2 border border-1">
              <ShopCategoryFilter/>
              <ShopRatingFilter />
              <ShopPriceFliter />
            </div>
          </div>
          <div className="col-md-9">
            <p className="fs-3 mb-0">Shop</p>
            <div className="row">
              <ShopProduct />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
