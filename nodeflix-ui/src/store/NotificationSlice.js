import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    message:'No message',
    open:false,
    severity:'info',
    transition:undefined
}
const NotificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        showNotification:(state, action)=>{
            state.open = true;
            state.message= action.payload.message;
            state.severity= action.payload.severity;
        },
        closeNotification:(state, action)=>{
            state.open = false;
        }

    }
})
export const  {showNotification, closeNotification} = NotificationSlice.actions
export default NotificationSlice.reducer