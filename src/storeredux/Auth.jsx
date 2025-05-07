import { createSlice } from "@reduxjs/toolkit";


const Authslice = createSlice({
    name:'auth',
initialState:{
    login:false,
    token:null,
    isProfileComplete:false,

},
reducers:{

login: (state,action)=>{
    state.login = true
    state.token = action.payload
    state.isProfileComplete = action.payload;
},
logout: (state)=>{
    state.login = false
    state.token = null
  
}


}

})
 export const {login,logout} =  Authslice.actions;
 export default  Authslice.reducer;
 