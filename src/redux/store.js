import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from "./features/categoriesSlice";
import searchSlice from "./features/searchSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
    categories: categoriesSlice
  }
})