import {atom }from 'recoil'
export interface User { 
    
    username:string;

}
export const userState = atom <{isLoading:boolean ,user:null|User}>({
    key:'userState',
    default:{
        isLoading:true,
        user:null
    }
})