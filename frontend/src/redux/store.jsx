import { configureStore } from "@reduxjs/toolkit";
import { ProductAPI } from "./api/ProductAPI";
import { AuthAPI } from "./api/AuthAPI";
import UserSlice from "./slice/UserSlice";
import { UserAPI } from "./api/UserAPI";
import { CartAPI } from "./api/CartAPI";
import { OrderAPI } from "./api/OrderAPI";
import { AdminAPI } from "./api/AdminAPI";
import { CategoryAPI } from "./api/CategoryAPI";


const store = configureStore({
  reducer: {
    user: UserSlice,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
    [CartAPI.reducerPath]: CartAPI.reducer,
    [OrderAPI.reducerPath]: OrderAPI.reducer,
    [AdminAPI.reducerPath]: AdminAPI.reducer,
    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ProductAPI.middleware,
      AuthAPI.middleware,
      UserAPI.middleware,
      CartAPI.middleware,
      OrderAPI.middleware,
      CategoryAPI.middleware,
      AdminAPI.middleware
    );
  },
});

export default store;
