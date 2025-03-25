import { createSlice } from "@reduxjs/toolkit";
import { 
    getAllQuery
} from '../thunk/serviceSlice';
const initialState = {
  isLoading: false,
  data : [],
  error: null,
};

export const QuerySlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers(builder){
   


  // ----------------------------------- get query api integration start here -----------------------------------------------
  builder.addCase(getAllQuery.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(getAllQuery.fulfilled, (state, action) => {
    state.isLoading = false;
    state.data =  action.payload;
  });
  builder.addCase(getAllQuery.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- get query api integration end here -----------------------------------------------


  }
},
);

export const { } = QuerySlice.actions;

export const Serives = QuerySlice.reducer;

