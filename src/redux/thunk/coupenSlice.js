import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../config/api/post';
import { Get } from '../../config/api/get';
import { Delete } from '../../config/api/delete';
import { COUPEN } from '../../config/constants';

//Coupen get api integration start here
const getAllCoupen = createAsyncThunk('coupen/get', async (data) => {
    try {
       const response = await Get(COUPEN.getall);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//Coupen get api integration end here

//Coupen Create api integration start here
const CreateCoupen = createAsyncThunk('coupen/create', async (data) => {
    try {
        const { token , formdata} = data 
       const response = await Post(COUPEN.create , formdata  , token);
       return response
    
    } catch (error) {
        return error?.response?.data
    }
});
//Coupen Create api integration end here


//Coupen Delete api integration start here
const DeleteCoupen = createAsyncThunk('coupen/delete', async (data) => {
    try {
        const { token , id } = data 
       const response = await Delete(COUPEN.delete+id  , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//Coupen Delete api integration end here









export {
    getAllCoupen,
    CreateCoupen,
    DeleteCoupen
   
}

