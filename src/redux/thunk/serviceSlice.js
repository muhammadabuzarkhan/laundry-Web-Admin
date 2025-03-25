import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../config/api/post';
import { Get } from '../../config/api/get';
import { Put } from '../../config/api/put';
import { CATEGORIES , SUBCATEGORIES , PRODUCTS } from '../../config/constants';

//all Services api integration start here
const getallServices = createAsyncThunk('category/getall', async (data) => {
    try {
       const response = await Get(CATEGORIES.getAllCategories , data);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all Services api integration end here

//create Service api integration start here
const createServices = createAsyncThunk('category/create', async (data) => {
    try {
        const {formdata , token } = data
       const response = await Post(CATEGORIES.addCategory ,formdata , token, null , "multipart");
      
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//create Service api integration end here

// soft delete Service api integration start here
const softDeleteServices = createAsyncThunk('category/softdelete', async (data) => {
    try {
        const {id , token , userData } = data
        console.log("userData",userData , "token",token , "id" , id);
       const response = await Put(CATEGORIES.softDeleteCategories+id , token , userData );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// soft delete Service api integration end here

//all sub Services api integration start here
const getallsubServices = createAsyncThunk('subcategory/getall', async (data) => {
    try {
       const response = await Get(SUBCATEGORIES.getAllsubCategories , data);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all sub Services api integration end here

//create sub Services api integration start here
const createsubServices = createAsyncThunk('subcategory/create', async (data) => {
    try {
        const {userData , token } = data
       const response = await Post(SUBCATEGORIES.create ,userData , token);
      
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//create sub Services api integration end here

// soft delete sub Service api integration start here
const softDeleteSubServices = createAsyncThunk('subcategory/softdelete', async (data) => {
    try {
        const {id , token , userData } = data
        console.log("userData",userData , "token",token , "id" , id);
       const response = await Put(SUBCATEGORIES.softDeletesubCategories+id , token , userData );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// soft delete sub Service api integration end here

//all sub Category w.r.f categoryId api integration start here
const subCatByCategory = createAsyncThunk('subcategory/filter', async (data) => {
    try {
        const  {id , token} = data
       const response = await Get(SUBCATEGORIES.filterByCategory+id , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all sub Category w.r.f categoryId api integration end here

//all products  api integration start here
const getallProducts = createAsyncThunk('product/getall', async (data) => {
    try {
        const  { token} = data
       const response = await Get(PRODUCTS.getall , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all products  api integration start here

//all products  api integration start here
const getProductsWithCategory = createAsyncThunk('product/filter', async (data) => {
    try {
        const  {id , token} = data
       const response = await Get(PRODUCTS.filterbyCategoryId+id , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all products  api integration start here

// create products  api integration start here
const createProduct = createAsyncThunk('product/create', async (data) => {
    try {
        const  {userData , token} = data
       const response = await Post(PRODUCTS.create , userData , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//create products  api integration start here

// soft delete Products api integration start here
const softDeleteProducts = createAsyncThunk('product/softdelete', async (data) => {
    try {
        const {id , token , userData } = data
        console.log("userData",userData , "token",token , "id" , id);
       const response = await Put(PRODUCTS.softdelete+id , token , userData );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// soft delete Products api integration end here

// search product api integration start here
const searchProducts = createAsyncThunk('product/search', async (data) => {
    try {
        const {text , token } = data
       const response = await Get(PRODUCTS.searchProduct+text , token );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// search product api integration end here

// search subCategory api integration start here
const searchSubCategory = createAsyncThunk('subcategory/search', async (data) => {
    try {
        const {text , token } = data
       const response = await Get(SUBCATEGORIES.searchSubCategory+text , token );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// search subCategory api integration end here

// search Category api integration start here
const searchCategory = createAsyncThunk('category/search', async (data) => {
    try {
        const {text , token } = data
       const response = await Get(CATEGORIES.searchCategory+text , token );
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// search Category api integration end here

// date and status filter product api integration start here
const dateAndStatusFilter = createAsyncThunk('product/datefilter', async (data) => {
    try {
        const { userData , token  } = data 
    let {fromDate, toDate , id } = userData
      
        if (fromDate === "1970-01-01" && toDate === "1970-01-01") {
            fromDate = null;
            toDate = null;
        }

        if(fromDate && toDate && id){
          
            const response = await Get(PRODUCTS.datafilter , token , {fromDate, toDate ,  id } );
            return response
        }
        else if(fromDate && toDate){
           
            const response = await Get(PRODUCTS.datafilter , token , {fromDate,toDate } );
            return response
        }

        else if(id){
           
            const response = await Get(PRODUCTS.datafilter, token, { id });
            return response;
        }

      
    } catch (error) {
        console.log('error', error)
    }
});
// search product api integration end here


// date and status filter subCategory api integration start here
const dateAndStatusFilterSubServices = createAsyncThunk('subcategory/datefilter', async (data) => {
    try {
        const { userData , token  } = data 
    let {fromDate, toDate , id } = userData
      
        if (fromDate === "1970-01-01" && toDate === "1970-01-01") {
            fromDate = null;
            toDate = null;
        }

        if(fromDate && toDate && id){
          
            const response = await Get(SUBCATEGORIES.datafilter , token , {fromDate, toDate ,  id } );
            return response
        }
        else if(fromDate && toDate){
           
            const response = await Get(SUBCATEGORIES.datafilter , token , {fromDate,toDate } );
            return response
        }

        else if(id){
           
            const response = await Get(SUBCATEGORIES.datafilter, token, { id });
            return response;
        }

      
    }  catch (error) {
        console.log('error', error)
    }
});
// date and status filter subCategory api integration end here

//date filter Services api integration start here
const datefilterServices = createAsyncThunk('category/datefilter', async (data) => {
    const {token , userData } = data
    const {fromDate,toDate } = userData
    try {
       const response = await Get(CATEGORIES.dateFilter , token , { fromDate,toDate });
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
//all Services api integration end here

// get product by id api integration start here
const getProductById  = createAsyncThunk('product/getbyid', async (data) => {
    try {
        const  {token , id} = data
       const response = await Get(PRODUCTS.getbyid+id , token);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// get product by id api integration end here

// get subCategory by id api integration start here
const getsubCategoryById  = createAsyncThunk('subcategory/getbyid', async (data) => {
    try {
        const  {token , id} = data
       const response = await Get(SUBCATEGORIES.getbyid+id , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
// get subCategory by id api integration end here

// get Category by id api integration start here
const getCategoryById  = createAsyncThunk('category/getbyid', async (data) => {
    try {
        const  { id , token} = data
       const response = await Get(CATEGORIES.getbyid+id , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
// get Category by id api integration end here

// update SubCategory api integration start here
const updateSubCategory = createAsyncThunk('subcategory/edit', async (data) => {
    try {
        const  {id , payload , token} = data
       const response = await Put(SUBCATEGORIES.update+id , token , payload);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// update SubCategory api integration end here

// update Product api integration start here
const updateproduct = createAsyncThunk('product/edit', async (data) => {
    try {
        const  {id , payload , token} = data
       const response = await Put(PRODUCTS.update+id , token , payload);
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});
// update Product api integration end here

const updateDays = createAsyncThunk('Category/edit', async (data) => {
    try {
        const  {id , payload , token} = data
      
       const response = await Put(CATEGORIES.updateCat+id , token , payload);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});

const UpdateCategory = createAsyncThunk('Category/updated', async (data) => {
    try {
        const  {id , payload , token} = data
      
       const response = await Put(CATEGORIES.edit+id , token , payload , null , "multipart");
       return response
    
    } catch (error) {
        console.log('error', error)
    }
});


//all query  api integration start here
const getAllQuery = createAsyncThunk('query/getall', async (data) => {
    try {
        const  {token} = data
       const response = await Get(PRODUCTS.filterbyCategoryId , token);
       return response.data
    
    } catch (error) {
        console.log('error', error)
    }
});
//all query  api integration start here


export {
    getallServices,
    getallsubServices,
    subCatByCategory,
    createsubServices,
    getallProducts,
    getProductsWithCategory,
    createServices,
    softDeleteServices,
    softDeleteSubServices,
    createProduct,
    softDeleteProducts,
    searchProducts,
    searchSubCategory,
    searchCategory,
    dateAndStatusFilter,
    datefilterServices,
    dateAndStatusFilterSubServices,
    getProductById,
    getsubCategoryById,
    getCategoryById,
    updateSubCategory,
    updateproduct,
    updateDays,
    UpdateCategory,
    getAllQuery
}