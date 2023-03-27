import request from "..";

export default function login(userInfo:object){
    console.log(userInfo.id, userInfo.pwd)
    return request.get('/login', userInfo)
}