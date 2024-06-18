import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
    name: "user",
    initialState:{
        loading:false,
        user : {},
        isauthenticated : false,
        error:null,
        message:null,
        isUpdated:false,
    },

    reducers:{
        loginRequest(state , action){
            state.loading = true;
            state.isauthenticated = false;
            state.user={};
            state.error = null;
        },
        loginSuccess(state , action){
            state.loading = false;
            state.isauthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailed(state , action){
            state.loading = false;
            state.isauthenticated = false;
            state.user={};
            state.error = action.payload;
        },
        
        loaduserRequest(state , action){
            state.loading = true;
            state.isauthenticated = false;
            state.user={};
            state.error = null;
        },
        loaduserSuccess(state , action){
            state.loading = false;
            state.isauthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loaduserFailed(state , action){
            state.loading = false;
            state.isauthenticated = false;
            state.user={};
            state.error = action.payload;
        },

        logoutSuccess(state , action){
            state.loading = false;
            state.isauthenticated = false;
            state.user = {};
            state.error = null;
            state.message = action.payload;
        },
        logoutFailed(state , action){
            state.loading = false;
            state.isauthenticated = state.isauthenticated;
            state.user=state.user;
            state.error = action.payload;
        },

        updatepasswordRequest(state , action){
            state.loading = true;
            state.isUpdated = false;
            state.message= null;
            state.error = null;
        },
        updatepasswordSuccess(state , action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatepasswordFailed(state , action){
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        updateprofileRequest(state , action){
            state.loading = true;
            state.isUpdated = false;
            state.message= null;
            state.error = null;
        },
        updateprofileSuccess(state , action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateprofileFailed(state , action){
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        updateprofileafterupdate(state,action){
            state.error=null;
            state.isUpdated=false;
            state.message=null;
        },

        clearAllErrors(state , action){
            state.error = null;
            state.user = state.user;

        },
    },
})

export const login = (email,password) => async(dispatch) => {
    dispatch(userSlice.actions.loginRequest());
  try {
    const {data} = await axios.post("https://portfolio-backened-qaau.onrender.com/user/login" , {email,password} , {withCredentials:true,headers: {"Content-Type" : "application/json"}})
    
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());

  } catch (error) {
     dispatch(userSlice.actions.loginFailed(error.response.data.message))
  }
}

export const getuser = () => async(dispatch) => {
    dispatch(userSlice.actions.loaduserRequest());
  try {
    const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/user/get/user" , {withCredentials:true})
    
    dispatch(userSlice.actions.loaduserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());

  } catch (error) {
     dispatch(userSlice.actions.loaduserFailed(error.response.data.message))
  }
}

export const logout = () => async(dispatch) => {
    
  try {
    const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/user/logout" , {withCredentials:true})
    
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());

  } catch (error) {
     dispatch(userSlice.actions.logoutFailed(error.response.data.message))
  }
}

export const updatepassword = (currentpassword , newpassword , confirmpassword) => async(dispatch) => {
    dispatch(userSlice.actions.updatepasswordRequest());
    try {
      const {data} = await axios.put("https://portfolio-backened-qaau.onrender.com/user/update/password" ,{currentpassword , newpassword , confirmpassword} , {withCredentials:true , headers:{"Content-Type" : "application/json"}})
      
      dispatch(userSlice.actions.updatepasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
  
    } catch (error) {
       dispatch(userSlice.actions.updatepasswordFailed(error.response.data.message))
    }
  }

  export const updateprofile = (newuserdata) => async(dispatch) => {
    dispatch(userSlice.actions.updateprofileRequest());
    // console.log('sending update profile ' , newuserdata)
    try {
      
      const {data} = await axios.put("https://portfolio-backened-qaau.onrender.com/user/update/profile" ,newuserdata, {withCredentials:true , headers:{"Content-Type" : "multipart/form-data"},})
      dispatch(userSlice.actions.updateprofileSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
  
    } catch (error) {
      // console.error('Update profile error:', error.response);
      // console.error("Update profile error message:", error.message);
      //   console.error("Update profile error config:", error.config);
       dispatch(userSlice.actions.updateprofileFailed(error.response.data.message))
    }
  }

  export const resetprofile = () => async(dispatch) => {
    dispatch(userSlice.actions.updateprofileafterupdate());
   
  }

  



export const clearAllusererrors = () => (dispatch) => {
   dispatch(userSlice.actions.clearAllErrors());
}


export default userSlice.reducer;
