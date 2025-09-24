import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  payAmount: string;
  method: string;
  coin: string;
  network: string;
}

const initialState: FilterState = {
  payAmount: "",
  method: "Courier",
  coin: '',
  network: '',
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.payAmount = action.payload.payAmount;
      state.method = action.payload.method;
      state.coin = action.payload.coin;
      state.network = action.payload.network;
    },
    resetFilter: () => initialState,
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;