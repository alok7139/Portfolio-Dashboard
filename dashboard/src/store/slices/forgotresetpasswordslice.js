import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const forgotresetpassSlice = createSlice({
    name: "forgotpassword",
    initialState:{
        loading:false,
        error:null,
        message:null,
       
    },

    reducers:{
        forgotpasswordRequest(state , action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotpasswordSuccess(state , action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        forgotpasswordFailed(state , action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        resetpasswordRequest(state , action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetpasswordSuccess(state , action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        resetpasswordFailed(state , action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        
        

        

        clearAllErrors(state , action){
            state.error = null;
            state =state;
        },
    },
})

export const forgotpassword = (email) => async(dispatch) => {
    dispatch(forgotresetpassSlice.actions.forgotpasswordRequest());
    try {
        const {data} = await axios.post("https://portfolio-backened-qaau.onrender.com/user/forget/password" , {email} , {withCredentials:true,headers:{"Content-Type" : "application/json"}});

        dispatch(forgotresetpassSlice.actions.forgotpasswordSuccess(data.message));
        dispatch(forgotresetpassSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(forgotresetpassSlice.actions.forgotpasswordFailed(error.response.data.message))
    }
}

export const resetpassword = (token, password,confirmpassword) => async(dispatch) => {
    dispatch(forgotresetpassSlice.actions.resetpasswordRequest());
    try {
        const {data} = await axios.post(`https://portfolio-backened-qaau.onrender.com/user/reset/password/${token}` , {password,confirmpassword} , {withCredentials:true,headers:{"Content-Type" : "application/json"}});

        dispatch(forgotresetpassSlice.actions.resetpasswordSuccess(data.message));
        dispatch(forgotresetpassSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(forgotresetpassSlice.actions.resetpasswordFailed(error.response.data.message))
    }
}




export const clearAllforgotpassworderrors = () => (dispatch) => {
   dispatch(forgotresetpassSlice.actions.clearAllErrors());
}


export default forgotresetpassSlice.reducer;
