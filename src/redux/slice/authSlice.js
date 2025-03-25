import { createSlice } from '@reduxjs/toolkit';
import  {  
  authLogin , forgetPassword , verifyCode ,
   resetPassword ,authSignup , editProfile , getAllUsers } from "../thunk/authSlice"


 const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    users:[]
  },
  reducers: {
    logouts(state) {
      state.data = [];
      state.error = null;
      // Optionally reset other state properties if needed
    },
    allusers(state,action){
      state.users = action.payload
    }
  },
  extraReducers(builder) {
     // ----------------------------------- for admin login api -----------------------------------------------
     builder.addCase(authLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data =  action.payload?.data;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for admin login api -----------------------------------------------

     // ----------------------------------- for admin forget password api -----------------------------------------------
     builder.addCase(forgetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.data =  action.payload.message;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for admin forget password api -----------------------------------------------

    // ----------------------------------- for admin verify code api -----------------------------------------------
    builder.addCase(verifyCode.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.data =  action.payload.message;
    });
    builder.addCase(verifyCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for admin verify code api -----------------------------------------------

     // ----------------------------------- for admin reset password api -----------------------------------------------
     builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
    
      state.isLoading = false;
      state.data =  action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for admin reset password api -----------------------------------------------


    // ----------------------------------- for user registration api -----------------------------------------------
    builder.addCase(authSignup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authSignup.fulfilled, (state, action) => {
    
      state.isLoading = false;
      state.data =  [];
    });
    builder.addCase(authSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for user registration api -----------------------------------------------


     // ----------------------------------- for user edit profile api -----------------------------------------------
     builder.addCase(editProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data =  action.payload.updateProfile;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for user edit profile api -----------------------------------------------


     // ----------------------------------- for get all users api -----------------------------------------------
     builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users =  []
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ----------------------------------- for get all users api -----------------------------------------------
     
  },
})

// Action creators are generated for each case reducer function
export const { logouts , allusers } = userSlice.actions

// export default userSlice.reducer

export const UserReducers = userSlice.reducer;