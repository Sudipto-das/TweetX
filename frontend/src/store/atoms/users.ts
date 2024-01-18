import { atom } from "recoil";

export interface Users {
    _id:string;
    username:string;
    followers:string[];
    following:string[]
}
export const usersState = atom<Users[]>({
    key:'usersState',
    default:[]
})