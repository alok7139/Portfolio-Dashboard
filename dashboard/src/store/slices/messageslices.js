import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const messageSlice = createSlice({
    name: "message",
    initialState:{
        loading:false,
        messages: [],
        error:null,
        message: null,

    },
    reducers:{
        getallmessageRequest(state,action){
            state.messages = [];
            state.error = null;
            state.loading=true;

        },
        getallmessageSuccess(state,action){
            state.messages = action.payload;
            state.error = null;
            state.loading=false;

        },
        getallmessageFailed(state,action){
            state.messages =state.messages;
            state.error = action.payload;
            state.loading=false;

        },
        deletemessageRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading=true;

        },
        deletemessageSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading=false;

        },
        deletemessageFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading=false;

        },
        resetmessageslice(state,action){
            state.error = null;
            state.messages = state.messages;
            state.message = null;
            state.loading =false;
        },
        clearallerrors(state,action) {
            state.error = null;
            state.messages = state.messages;
        }

    }
});

export const getallmessages = () =>async(dispatch)=>{
   dispatch(messageSlice.actions.getallmessageRequest());
   try {
    const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/message/getall" , {withCredentials:true});

    dispatch(messageSlice.actions.getallmessageSuccess(data.messages));
    dispatch(messageSlice.actions.clearallerrors());
   } catch (error) {
      dispatch(messageSlice.actions.getallmessageFailed(error.response.data.message));
      
   }
}

export const messagedelete = (id) => async(dispatch) => {
   dispatch(messageSlice.actions.deletemessageRequest());
   try {
    const {data} = await axios.delete(`https://portfolio-backened-qaau.onrender.com/message/delete/${id}` , {withCredentials:true})

    dispatch(messageSlice.actions.deletemessageSuccess(data.message));
    dispatch(messageSlice.actions.clearallerrors());
   } catch (error) {
      dispatch(messageSlice.actions.deletemessageFailed(error.response.data.message));
   }
}

export const clearallmessageerror = () => (dispatch) => {
dispatch(messageSlice.actions.clearallerrors());
}

export const resetmessage = () => (dispatch) => {
  dispatch(messageSlice.actions.resetmessageslice());
}

export default messageSlice.reducer;