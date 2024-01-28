import {atom }from 'recoil'
export interface User { 
    id:string;
    username:string;
    followers:Followers[];
    following:Followers[]


}
export interface Followers {
    id:string;
    username:string
}
export const userState = atom <{isLoggedIn:boolean ,user:null|User}>({
    key:'userState',
    default:{
        isLoggedIn:false,
        user:null
    }
})