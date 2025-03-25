import { createAsyncThunk } from '@reduxjs/toolkit';
import { Put } from '../../config/api/put';
import { Get } from '../../config/api/get';
import { QUERY } from '../../config/constants';



//all query  api integration start here
const getAllQuery = createAsyncThunk('query/getall', async (data) => {
    try {
        const  {token} = data
       const response = await Get(QUERY.getall , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all query  api integration start here

//query search api integration start here
const QuerySearch = createAsyncThunk('query/search', async (data) => {
    try {
        const  {token , text} = data
       const response = await Get(QUERY.searchQuery+text , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//query search  api integration start here


//query Date Filter api integration start here
const QueryDateFilter = createAsyncThunk('query/dateFilter', async (data) => {
    try {
        const { userData , token } = data 
        const {fromDate,toDate } = userData

       const response = await Get(QUERY.dataFilter  , token , { fromDate, toDate } );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//query Date Filter api integration end here



//query Date Filter api integration start here
const QueryStatus = createAsyncThunk('query/status', async (data) => {
    try {
        const { userData , token } = data 
        const {id } = userData

       const response = await Put(QUERY.status+id  , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//query Date Filter api integration end here

export {
    getAllQuery,
    QuerySearch,
    QueryDateFilter,
    QueryStatus
}