import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../config/api/post';
import { Put } from '../../config/api/put';
import { AUTH , USERS } from '../../config/constants';
import { Get } from '../../config/api/get';

//admin login api start here
const authLogin = createAsyncThunk('admin/login', async (data) => {
    try {
       const response = await Post(AUTH.signin , data);
        console.log("response",response)
       if(response.status === false ){
        return response
       }else{
        return response
       }
    
    } catch (error) {
        console.log('error', error)
    }
});
//admin login api end here

//forget password api start here
const forgetPassword = createAsyncThunk('admin/forgetPassword', async (data) => {
    try {
       
       const resp = await Post(AUTH.emailCode , data , null , null ,null);
       return resp
    
    } catch (error) {
        //console.log('error', error?.response?.data)
        return error?.response?.data
    }
});
//forget password api end here


//verify code api start here
const verifyCode = createAsyncThunk('admin/verifyCode', async (data) => {
    try {
       
       const response = await Post(AUTH.verifyCode , data);
     
       return response
    
    } catch (error) {
        return error?.response?.data
    }
});
//verify code api end here

//reset password api start here
const resetPassword = createAsyncThunk('admin/resetPassword', async (data) => {
    try {
       
       const response = await Post(AUTH.resetPassword , data);
     
       return response
    
    } catch (error) {
        return error?.response?.data
    }
});
//reset password api end here

// signup user api start here
const authSignup = createAsyncThunk('user/register' , async (data) => {
    try { 
        const response = await Post(AUTH.signup , data);
        return response.data
     
     } catch (error) {
         console.log('error', error)
     }
})
// signup user api end here

// signup user api start here
const editProfile = createAsyncThunk('user/edit' , async (data) => {
    try { 
      
        let token = data.userToken
        let putData = data.user

        console.log("4555",token)

        const response = await Put(AUTH.update ,token ,putData);
        return response.data
     
     } catch (error) {
         console.log('error', error)
     }
})
// signup user api end here

// signup user api start here
const getAllUsers = createAsyncThunk('user/get' , async (data) => {
    try { 
      
        let token = data.userToken
        const response = await Get(USERS.getAllUsers ,token);
        return response.data
     
     } catch (error) {
         console.log('error', error)
     }
})
// signup user api end here

// user search api start here
const searchUsers = createAsyncThunk('user/search' , async (data) => {
    try { 
        const {text , token } = data
      
        const response = await Get(USERS.searchText+text ,token);
        return response
     
     } catch (error) {
         console.log('error', error)
     }
})
// user search api end here

// user date filter api start here
const DateFilterUsers = createAsyncThunk('user/filter' , async (data) => {
    try { 
        const { userData , token } = data
        const {   fromDate,
            toDate } = userData
      
        const response = await Get(USERS.datefilter ,token , {fromDate , toDate });
        return response
     
     } catch (error) {
         console.log('error', error)
     }
})
// user search api end here


// user orders api start here
const getUserOrders = createAsyncThunk('user/orders' , async (data) => {
    try { 
        const { id , token } = data
        console.log("==34343===>" , data);
        const response = await Get(USERS.getuserOrders+id ,token);
        console.log("=====>" , response);
        
        return response
     
     } catch (error) {
         console.log('error', error)
     }
})
// user orders api end here


// user order details api start here
const getUserOrderDetails = createAsyncThunk('user/orderDetails' , async (data) => {
    try { 
        const { id , token } = data
        
      
        const response = await Get(USERS.getuserOrdersDetails+id ,token);
        return response
     
     } catch (error) {
         console.log('error', error)
     }
})
// user order details api end here


export {
    authLogin,
    forgetPassword,
    verifyCode,
    resetPassword,
    authSignup,
    editProfile,
    getAllUsers,
    searchUsers,
    DateFilterUsers,
    getUserOrders,
    getUserOrderDetails
}