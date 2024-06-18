import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const skillSlice = createSlice({
    name: "skill",
    initialState:{
        loading:false,
        skills:[],
        error:null,
        message:null,

    },
    reducers: {
        getallskillsRequest(state,action){
            state.loading = true;
            state.skills=[];
            state.error = null;

        },
        getallskillsSuccess(state,action){
            state.loading = false;
            state.skills=action.payload;
            state.error = null;
        },
        getallskillsFailed(state,action){
            state.loading = false;
            state.skills= state.skills;
            state.error = state.payload;
        },
        addskillsRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        addskillsSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        addskillsFailed(state,action){
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        deleteskillsRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        deleteskillsSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        deleteskillsFailed(state,action){
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        updateskillsRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message=null;

        },
        updateskillsSuccess(state,action){
            state.loading = false;
            state.message=action.payload;
            state.error = null;
        },
        updateskillsFailed(state,action){
            state.loading = false;
            state.message= null;
            state.error = action.payload;
        },

        resetskillslice(state,action){
            state.error=null;
            state.loading = false;
            state.message=null;
            state.skills = state.skills;
        },
        
        clearallerrors(state,action){
            state.error=null;
            state.skills =state.skills;
        }
    }
})

export const getallskill = () =>async(dispatch)=>{
    dispatch(skillSlice.actions.getallskillsRequest());
    try {
     const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/skill/get" , {withCredentials:true});
 
     dispatch(skillSlice.actions.getallskillsSuccess(data.skills));
     dispatch(skillSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(skillSlice.actions.getallskillsFailed(error.response.data.message));
       
    }
 }

 export const addskill = (newdata) =>async(dispatch)=>{
    dispatch(skillSlice.actions.addskillsRequest());
    try {
     const {data} = await axios.post("https://portfolio-backened-qaau.onrender.com/skill/add" ,newdata, {withCredentials:true , headers:{"Content-Type": "multipart/form-data"} });
 
     dispatch(skillSlice.actions.addskillsSuccess(data.message));
     dispatch(skillSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(skillSlice.actions.addskillsFailed(error.response.data.message));
       
    }
 }
 
 export const deleteskill = (id) =>async(dispatch)=>{
    dispatch(skillSlice.actions.deleteskillsRequest());
    try {
     const {data} = await axios.delete(`https://portfolio-backened-qaau.onrender.com/skill/delete/${id}` , {withCredentials:true });
 
     dispatch(skillSlice.actions.deleteskillsSuccess(data.message));
     dispatch(skillSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(skillSlice.actions.deleteskillsFailed(error.response.data.message));
       
    }
 }

 export const updateskill = (id , proficiency) =>async(dispatch)=>{
    dispatch(skillSlice.actions.updateskillsRequest());
    try {
     const {data} = await axios.put(`https://portfolio-backened-qaau.onrender.com/skill/update/${id}` ,{proficiency} , {withCredentials:true ,headers:{"Content-Type" : "application/json"}});
  
     dispatch(skillSlice.actions.updateskillsSuccess(data.message));
     dispatch(skillSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(skillSlice.actions.updateskillsFailed(error.response.data.message));
       
    }
 }

 

 export const clearallskillerrror = () => (dispatch) => {
    dispatch(skillSlice.actions.clearallerrors());
 }

 export const resetskillslice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetskillslice());
 }

 


 export default skillSlice.reducer;