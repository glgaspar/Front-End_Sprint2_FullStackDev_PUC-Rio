import axios from 'axios';

export function APIData(token){
    const api = axios.create({
        baseURL:process.env.REACT_APP_PATH_API_BACKEND,
        headers: {
            'X-Custom-Token' : token, 
            'Content-Type':'application/json;charset=utf-8'
        }
    });
    
    return api
};

export function APIUser(token){
    const api = axios.create({
        baseURL:process.env.REACT_APP_PATH_API_LOGIN,
        headers: {
            'X-Custom-Token' : token, 
            'Content-Type':'application/json;charset=utf-8'
        }
    });
    
    return api
};