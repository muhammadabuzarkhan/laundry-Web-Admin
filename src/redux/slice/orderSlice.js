import { createSlice } from '@reduxjs/toolkit';
import  { getAllOrders , getOrderDetails , OrderStatusChanged } from "../thunk/orderSlice"


 const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isLoading: false,
    data: [],
    userOrder: [],
    status : false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.isLoading = false
      state.data = []
      state.userOrder = []
      state.status =  false
    },
    clearUserOrders: (state) => {
      state.isLoading = false
      state.userOrder = []
      state.status =  false
    },
   
  },
  extraReducers(builder) {
     // ----------------------------------- for create order api -----------------------------------------------
     builder.addCase(getAllOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data =  action.payload
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for create order api -----------------------------------------------


     // ----------------------------------- for user orders api -----------------------------------------------
     builder.addCase(getOrderDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log("action",action);
      state.isLoading = false;
      state.data =  action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for user orders api -----------------------------------------------

      // ----------------------------------- for user order status api -----------------------------------------------
      builder.addCase(OrderStatusChanged.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(OrderStatusChanged.fulfilled, (state, action) => {
          console.log("action",action);
        state.isLoading = false;
        state.status =  false ;
      });
      builder.addCase(OrderStatusChanged.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
      // ----------------------------------- for user order status api -----------------------------------------------

   
     
  },
})

// Action creators are generated for each case reducer function
export const { clearOrders , clearUserOrders } = orderSlice.actions

// export default userSlice.reducer

export const OrderReducers = orderSlice.reducer;