import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const educationSlice = createSlice({
    name: "education",
    initialState:{
        loading:false,
        timeline: [],
        error:null,
        message: null,

    },
    reducers:{
        getalleducationRequest(state,action){
            state.timeline = [];
            state.error = null;
            state.loading=true;

        },
        getalleducationSuccess(state,action){
            state.timeline = action.payload;
            state.error = null;
            state.loading=false;

        },
        getalleducationFailed(state,action){
            state.timeline =state.timeline;
            state.error = action.payload;
            state.loading=false;

        },
        deleteeducationRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading=true;

        },
        deleteeducationSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading=false;

        },
        deleteeducationFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading=false;

        },
        addeducationRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading=true;

        },
        addeducationSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading=false;

        },
        addeducationFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading=false;

        },
        reseteducationslice(state,action){
            state.error = null;
            state.timeline = state.timeline;
            state.message = null;
            state.loading =false;
        },
        clearallerrors(state,action) {
            state.error = null;
            state.timeline = state.timeline;
        }

    }
});

export const getalleducation = () =>async(dispatch)=>{
   dispatch(educationSlice.actions.getalleducationRequest());
   try {
    const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/timeline/getall" , {withCredentials:true});

    dispatch(educationSlice.actions.getalleducationSuccess(data.timeline));
    dispatch(educationSlice.actions.clearallerrors());
   } catch (error) {
      dispatch(educationSlice.actions.getalleducationFailed(error.response.data.message));
      
   }
}

export const educationdelete = (id) => async(dispatch) => {
   dispatch(educationSlice.actions.deleteeducationRequest());
   try {
    const {data} = await axios.delete(`https://portfolio-backened-qaau.onrender.com/timeline/delete/${id}` , {withCredentials:true})

    dispatch(educationSlice.actions.deleteeducationSuccess(data.message));
    dispatch(educationSlice.actions.clearallerrors());
   } catch (error) {
      dispatch(educationSlice.actions.deleteeducationFailed(error.response.data.message));
   }
}

export const educationadd = (newdata) => async(dispatch) => {
    dispatch(educationSlice.actions.addeducationRequest());
    try {
     const {data} = await axios.post(`https://portfolio-backened-qaau.onrender.com/timeline/add` ,newdata , {withCredentials:true , headers:{"Content-Type": "application/json"}})
 
     dispatch(educationSlice.actions.addeducationSuccess(data.message));
     dispatch(educationSlice.actions.clearallerrors());
    } catch (error) {
       dispatch(educationSlice.actions.addeducationFailed(error.response.data.message));
    }
 }

export const clearalleducationerror = () => (dispatch) => {
dispatch(educationSlice.actions.clearallerrors());
}

export const reseteducation = () => (dispatch) => {
  dispatch(educationSlice.actions.reseteducationslice());
}

export default educationSlice.reducer;