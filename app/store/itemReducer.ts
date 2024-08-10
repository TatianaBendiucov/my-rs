import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "app/types/SearchTypes";

const initialState: { values: SearchResult[] } = {
  values: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addOrRemove: (state, action: PayloadAction<SearchResult>) => {
      const index = state.values.findIndex(
        (item) => item.uid === action.payload.uid,
      );
      if (index >= 0) {
        state.values.splice(index, 1);
      } else {
        state.values.push(action.payload);
      }
    },
    removeAll: (state) => {
      state.values = [];
    },
  },
});

export const { addOrRemove, removeAll } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
