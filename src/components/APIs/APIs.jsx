import axios from 'axios';

export function APIData(token){
    const api = axios.create({
        baseURL:"http://localhost:7000",
        headers: {
            'X-Custom-Token' : token, 
            'Content-Type':'application/json;charset=utf-8'
        }
    });
    
    return api
};

export function APIUser(token){
    const api = axios.create({
        baseURL:"http://localhost:5000",
        headers: {
            'X-Custom-Token' : token, 
            'Content-Type':'application/json;charset=utf-8'
        }
    });
    
    return api
};