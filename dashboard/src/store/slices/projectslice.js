import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const projectSlice= createSlice({
    name:"project",
    initialState:{
        loading:false,
        error:null,
        message:null,
        projects: [],
    },
    reducers:{
        getallprojectRequest(state,action){
            state.loading = true;
            state.projects=[];
            state.error = null;

        },
        getallprojectSuccess(state,action){
            state.loading = false;
            state.projects=action.payload;
            state.error = null;
        },
        getallprojectFailed(state,action){
            state.loading = false;
            state.projects = state.projects;
            state.error = state.payload;
        },
        addprojectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        addprojectSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        addprojectFailed(state,action){ 
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        deleteprojectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        deleteprojectSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        deleteprojectFailed(state,action){
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        updateprojectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        updateprojectSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        updateprojectFailed(state,action){
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        resetprojectslice(state,action){
            state.error=null;
            state.loading = false;
            state.message=null;
            state.projects = state.projects;
        },
        
        clearallerrors(state,action){
            state.error=null;
            state.projects =state.projects;
        }
    }
})


export const getallproject = () =>async(dispatch)=>{
    dispatch(projectSlice.actions.getallprojectRequest());
    try {
     const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/project/getall" , {withCredentials:true});
 
     dispatch(projectSlice.actions.getallprojectSuccess(data.projects));
     dispatch(projectSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(projectSlice.actions.getallprojectFailed(error.response.data.message));
       
    }
 }

 export const addproject = (newdata) =>async(dispatch)=>{
    dispatch(projectSlice.actions.addprojectRequest());
    try {
     const {data} = await axios.post("https://portfolio-backened-qaau.onrender.com/project/add" ,newdata, {withCredentials:true , headers:{"Content-Type": "multipart/form-data"} });
 
     dispatch(projectSlice.actions.addprojectSuccess(data.message));
     dispatch(projectSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(projectSlice.actions.addprojectFailed(error.response.data.message));
       
    }
 }
 
 export const deleteproject = (id) =>async(dispatch)=>{
    dispatch(projectSlice.actions.deleteprojectRequest());
    try {
     const {data} = await axios.delete(`https://portfolio-backened-qaau.onrender.com/project/delete/${id}` , {withCredentials:true });
 
     dispatch(projectSlice.actions.deleteprojectSuccess(data.message));
     dispatch(projectSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(projectSlice.actions.deleteprojectFailed(error.response.data.message));
       
    }
 }

 export const updateproject = (id , newdata) =>async(dispatch)=>{
    // console.log(id);
    dispatch(projectSlice.actions.updateprojectRequest());
    try {
     const {data} = await axios.put(`https://portfolio-backened-qaau.onrender.com/project/update/${id}` ,newdata , {withCredentials:true , headers:{"Content-Type": "multipart/form-data"} });
 
     dispatch(projectSlice.actions.updateprojectSuccess(data.message));
     dispatch(projectSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(projectSlice.actions.updateprojectFailed(error.response.data.message));
       
    }
 }

 

 export const clearallprojecterrror = () => (dispatch) => {
    dispatch(projectSlice.actions.clearallerrors());
 }

 export const resetprojectslice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetprojectslice());
 }

export default projectSlice.reducer;