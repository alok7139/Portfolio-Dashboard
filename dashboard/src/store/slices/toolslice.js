import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const toolSlice= createSlice({
    name:"tool",
    initialState:{
        loading:false,
        error:null,
        message:null,
        softwareapplication: [],
    },
    reducers:{
        getalltoolRequest(state,action){
            state.loading = true;
            state.softwareapplication=[];
            state.error = null;

        },
        getalltoolSuccess(state,action){
            state.loading = false;
            state.softwareapplication=action.payload;
            state.error = null;
        },
        getalltoolFailed(state,action){
            state.loading = false;
            state.softwareapplication= state.softwareapplication;
            state.error = state.payload;
        },
        addtoolRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        addtoolSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        addtoolFailed(state,action){ 
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        deletetoolRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        deletetoolSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        deletetoolFailed(state,action){
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        resettoolslice(state,action){
            state.error=null;
            state.loading = false;
            state.message=null;
            state.softwareapplication = state.softwareapplication;
        },
        
        clearallerrors(state,action){
            state.error=null;
            state.softwareapplication =state.softwareapplication;
        }
    }
})


export const getalltool = () =>async(dispatch)=>{
    dispatch(toolSlice.actions.getalltoolRequest());
    try {
     const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/application/getall" , {withCredentials:true});
 
     dispatch(toolSlice.actions.getalltoolSuccess(data.softwareapplication));
     dispatch(toolSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(toolSlice.actions.getalltoolFailed(error.response.data.message));
       
    }
 }

 export const addtool = (newdata) =>async(dispatch)=>{
    dispatch(toolSlice.actions.addtoolRequest());
    try {
     const {data} = await axios.post("https://portfolio-backened-qaau.onrender.com/application/add" ,newdata, {withCredentials:true , headers:{"Content-Type": "multipart/form-data"} });
 
     dispatch(toolSlice.actions.addtoolSuccess(data.message));
     dispatch(toolSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(toolSlice.actions.addtoolFailed(error.response.data.message));
       
    }
 }
 
 export const deletetool = (id) =>async(dispatch)=>{
    dispatch(toolSlice.actions.deletetoolRequest());
    try {
     const {data} = await axios.delete(`https://portfolio-backened-qaau.onrender.com/application/delete/${id}` , {withCredentials:true });
 
     dispatch(toolSlice.actions.deletetoolSuccess(data.message));
     dispatch(toolSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(toolSlice.actions.deletetoolFailed(error.response.data.message));
       
    }
 }

 

 export const clearalltoolerrror = () => (dispatch) => {
    dispatch(toolSlice.actions.clearallerrors());
 }

 export const resettoolslice = () => (dispatch) => {
    dispatch(toolSlice.actions.resettoolslice());
 }

export default toolSlice.reducer;