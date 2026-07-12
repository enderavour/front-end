import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StringState
{
  value: string
}

const initialState: StringState = {
  value: "Test string"
};

const stringReduxSlice = createSlice({
  name: "testStringSlice",
  initialState,
  reducers: {
    update(str, action: PayloadAction<string>)
    {
      if (str.value === action.payload)
        str.value = initialState.value;
      else
        str.value = action.payload;
    }
  }
});

export const { update } = stringReduxSlice.actions;
export default stringReduxSlice.reducer;
