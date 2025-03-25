import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../config/api/post';
import { Get } from '../../config/api/get';
import { Delete } from '../../config/api/delete';
import { REFERAL } from '../../config/constants';

//Referal get api integration start here
const getAllReferal = createAsyncThunk('referal/get', async (data) => {
    const { token } = data
    try {
       const response = await Get(REFERAL.getall , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//Referal get api integration end here

//Referal Create api integration start here
const CreateReferal = createAsyncThunk('referal/create', async (data) => {
    try {
        const { token , formdata} = data 
       const response = await Post(REFERAL.create , formdata  , token);
       return response
    
    } catch (error) {
        return error?.response?.data
    }
});
//Referal Create api integration end here


//Referal Delete api integration start here
const DeleteReferal = createAsyncThunk('referal/delete', async (data) => {
    try {
        const { token , id } = data 
       const response = await Delete(REFERAL.delete+id  , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//Referal Delete api integration end here


export {
    getAllReferal,
    CreateReferal,
    DeleteReferal
}