import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userslice";
import   forgotresetpassReducer  from "./slices/forgotresetpasswordslice";
import  messageReducer from "./slices/messageslices";
import educationReducer from "./slices/educationslice";
import skillsReducer from "./slices/skillsslice";
import toolReducer from "./slices/toolslice";
import projectReducer from "./slices/projectslice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        forgotpassword: forgotresetpassReducer,
        message: messageReducer,
        education: educationReducer,
        skill : skillsReducer,
        tool: toolReducer,
        project: projectReducer,
    } 
})