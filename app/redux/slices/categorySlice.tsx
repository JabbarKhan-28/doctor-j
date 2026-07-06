import { createSlice } from "@reduxjs/toolkit";
import { categories } from "@/app/data/category";

const initialState = {
  categories,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;