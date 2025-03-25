import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../config/api/post';
import { Get } from '../../config/api/get';
import { Put } from '../../config/api/put';
import { ORDER } from '../../config/constants';

//Order get api integration start here
const getAllOrders = createAsyncThunk('order/get', async (data) => {
    try {
        const { token } = data 
       const response = await Get(ORDER.getall  , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//Order get api integration end here

//Order Details api integration start here
const getOrderDetails = createAsyncThunk('orderDetails/get', async (data) => {
    try {
        const { id , token } = data 
       const response = await Get(ORDER.orderDetails+id  , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//Order Details api integration end here

//Order status Changed api integration start here
const OrderStatusChanged = createAsyncThunk('orderchnaged/status', async (data) => {
    try {
        const { id , token } = data 
       const response = await Put(ORDER.orderstatus+id  , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//Order status Changed api integration end here

//Orders search api integration start here
const OrderSearch = createAsyncThunk('order/search', async (data) => {
    try {
        const { text , token } = data 
       const response = await Get(ORDER.searchOrders+text  , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//Orders search api integration end here


//Orders Date Filter api integration start here
const OrderDateFilter = createAsyncThunk('order/dateFilter', async (data) => {
    try {
        const { userData , token } = data 
        const {fromDate,toDate } = userData

       const response = await Get(ORDER.dateFilter  , token , { fromDate, toDate } );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//Orders Date Filter api integration end here

//user Orders api integration start here
const OrderDetailsdata = createAsyncThunk('order/details', async (data) => {
    try {
       
        const { id , token } = data
       const response = await Get(ORDER.orderDetails+id   , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//user Orders create api integration end here

export {
    getAllOrders,
    getOrderDetails,
    OrderStatusChanged,
    OrderSearch,
    OrderDateFilter,
    OrderDetailsdata
}