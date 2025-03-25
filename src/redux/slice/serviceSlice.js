import { createSlice } from "@reduxjs/toolkit";
import { 
  getallServices , getallsubServices , subCatByCategory , 
  getallProducts , getProductsWithCategory , createServices ,
  softDeleteServices
} from '../thunk/serviceSlice';
const initialState = {
  isLoading: false,
  cartItems : [],
  serviceItems: [],
  subserviceItems: {},
  products : {},
  subTotal : 0,
  error: null,
};

export const cartSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
   
     addToCart: (state, action) => {
      const { payload } = action;
      const existingItem = state.cartItems.find(item => item.title === payload.title && item.id === payload.id);
    
      if (existingItem) {
        state.cartItems = state.cartItems.map(item =>
          item.title === payload.title && item.id === payload.id
            ? { ...item, quantity: item.quantity + payload.quantity , price : Number(item.price) * Number(item.quantity) }
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, payload];
      }
    },
    
    quantityAndPriceChanges: (state, action) => {
      const { count, details, decount } = action.payload;
      const existingItem = state.cartItems.find(item => item.title === details.title && item.id === details.id);
    
      if (existingItem) {

        

        state.cartItems = state.cartItems.map(item => {
          if (item.title === details.title && item.id === details.id) {

            const newQuantity = item.quantity + (count || -decount);
            const retailPrice = item.price
            const newPrice = retailPrice * newQuantity

            console.log(
              "newQuantity",newQuantity ,
              "newPrice",newPrice , 
              "item.quantity",item.quantity, 
              "item.price" ,item.price 
            );
            return {
              ...item,
              quantity: newQuantity,
              subprice: newPrice
            };
          }
          return item;
        });
      }
    },
    removeProfileImage:(state, action) => {
      const { catImage , ...rest } = action.payload

      const data = {
        ...rest,
        catImage : null
      }
      return data;
    },

    
    
    removeFromCart: (state, { payload }) => {
        const { id } = payload;
         const itemToRemove = state.cartItems.find((item) => item.id === id);
        if (itemToRemove) {
          //state.subTotal -= itemToRemove.quantity * itemToRemove.price;
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== id
          );
        }
      },

    clearCart: (state) => {
      state.cartItems = [];
      state.subTotal = 0;
    },
    updateCartItemQuantity: (state, { payload }) => {
        const { name, quantity } = payload;
        const itemToUpdate = state.serviceItems.find((item) => item.name === name);
        if (itemToUpdate) {
          const quantityDifference = quantity - itemToUpdate.quantity;
          itemToUpdate.quantity = quantity;
          state.subTotal += quantityDifference * itemToUpdate.price;
        }
      },
  },
  extraReducers(builder){
   // ----------------------------------- all Services api integration start here -----------------------------------------------
   builder.addCase(getallServices.pending, (state, action) => {
    
    state.isLoading = true;
  });
  builder.addCase(getallServices.fulfilled, (state, action) => {
   
    state.isLoading = false;
    state.serviceItems =  action.payload;
  });
  builder.addCase(getallServices.rejected, (state, action) => {
    
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- all Services api integration end here -----------------------------------------------\

  // ----------------------------------- Services create api integration start here -----------------------------------------------
  builder.addCase(createServices.pending, (state, action) => {
    
    state.isLoading = true;
  });
  builder.addCase(createServices.fulfilled, (state, action) => {
   
    state.isLoading = false;
    state.serviceItems =  action.payload;
  });
  builder.addCase(createServices.rejected, (state, action) => {
    
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- Services create api integration end here -----------------------------------------------\


  // ----------------------------------- Services change Status api integration start here -----------------------------------------------
  builder.addCase(softDeleteServices.pending, (state, action) => {
    
    state.isLoading = true;
  });
  builder.addCase(softDeleteServices.fulfilled, (state, action) => {
   
    state.isLoading = false;
    state.serviceItems =  action.payload;
  });
  builder.addCase(softDeleteServices.rejected, (state, action) => {
    
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- Services change Status api integration end here -----------------------------------------------\

  // -----------------------------------  sub Services w . r . f of serviceId api integration start here -----------------------------------------------
  builder.addCase(getallsubServices.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(getallsubServices.fulfilled, (state, action) => {
    state.isLoading = false;
    state.subserviceItems =  action.payload;
  });
  builder.addCase(getallsubServices.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- sub Services w . r . f of serviceId api integration end here -----------------------------------------------


  // -----------------------------------  sub Category w.r.f categoryId api integration start here -----------------------------------------------
  builder.addCase(subCatByCategory.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(subCatByCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.subserviceItems =  action.payload;
  });
  builder.addCase(subCatByCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- sub Category w.r.f categoryId api integration end here -----------------------------------------------


  // ----------------------------------- all products api integration start here -----------------------------------------------
  builder.addCase(getallProducts.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(getallProducts.fulfilled, (state, action) => {
    state.isLoading = false;
    state.products =  action.payload;
  });
  builder.addCase(getallProducts.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- all products api integration end here -----------------------------------------------


  // ----------------------------------- products w . r . f categoryId api integration start here -----------------------------------------------
  builder.addCase(getProductsWithCategory.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(getProductsWithCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.products =  action.payload;
  });
  builder.addCase(getProductsWithCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  // ----------------------------------- products w . r . f categoryId api integration end here -----------------------------------------------


  }
},
);

export const {quantityAndPriceChanges , addToCart, removeFromCart, clearCart , updateCartItemQuantity , removeProfileImage } = cartSlice.actions;

export const Serives = cartSlice.reducer;

