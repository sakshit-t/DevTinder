// import {createSlice} from '@reduxjs/toolkit'
// const userSlice=createSlice({
//     name:'user',
//     initialState:{user:null},   
//     reducers:{
//         setUser:(state,action)=>{
//            return action.payload;
//         },
//         removeUser:(state,action)=>{
//             return null;
//         },
//     },
// });
// export const {addUser,removeUser}=userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
        addUser: (state, action) => action.payload, 
    removeUser: () => null,
    },
});

export const { addUser, removeUser }  = userSlice.actions;
export default userSlice.reducer;
    