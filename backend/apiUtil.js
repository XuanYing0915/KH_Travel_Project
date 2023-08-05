import axios from "axios";

const userRequest = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
  })

export const login = (email,userAccount, userPassword) => {
    return userRequest.post("/demo/api/v1/user/login",
    JSON.stringify({
        email,
        userAccount,
        userPassword,})
        ).then((res) => res.data).catch((err)=>err.toString());
  };