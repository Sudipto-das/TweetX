import { atom } from "recoil";
export interface User{
    username:string|null
}
export interface Post{
    id: string;
    title: string;
    description: string;
    like: number;
    likes: [];
    created_at: string;
    userId: User
    timeAgo: string
}
export const postState = atom <Post[]>({
    key:'postState',
    default:[]

})