import { createSlice } from "@reduxjs/toolkit";


const Authslice = createSlice({
    name:'auth',
initialState:{
    login:false,
    token:null,
    isProfileComplete:false,
    premium:false

},
reducers:{

login: (state,action)=>{
    state.login = true
    state.token = action.payload
      state.isProfileComplete = action.payload.isProfileComplete || false;
},
logout: (state)=>{
    state.login = false
    state.token = null
  
},
activatepremium : (state)=>{
    state.premium= !state.premium
     
  
},
profilecomplete: (state)=>{
    state.isProfileComplete = true
     
  
}


}

})
 export const {login,logout,activatepremium,profilecomplete} =  Authslice.actions;
 export default  Authslice.reducer;
 