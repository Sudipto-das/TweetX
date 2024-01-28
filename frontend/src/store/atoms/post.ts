import { atom } from "recoil";
export interface User{
    _id:string;
    username:string|null
}
export interface Post{
    _id: string;
    title: string;
    description: string;
    like: number;
    likes: string[];
    created_at: string;
    userId: User
    timeAgo: string
}
export const postState = atom <Post[]>({
    key:'postState',
    default:[]

})