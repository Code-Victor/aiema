import axios, { AxiosError } from "axios";
import { getAuthToken,setAuthToken } from "@/lib/utils";
import * as ApiTypes from "./types"

const BASE_URL= "http://172.17.3.135:3009/"

const api= axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Error logger
function errorLogger(context = false) {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (
      error: AxiosError<{
        message?: string;
      }>
    ) => {
      const url = error.response?.config.url as string;
      const method = error.response?.config.method as string;
      const status = error.response?.status as number;
      const message = error.response?.data?.message as string;
      console.log(`API Error -> ${url}(${status})[${method}]: ${message}`);
      if (context) {
        console.log("context:", error.response?.data);
      }
      return Promise.reject(error);
    }
  );
}

function tokenInterceptors({ log = false } = {}) {
  const tokenInterceoptor = api.interceptors.request.use(
    async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      if (log) {
        const url = config.url as string;
        const method = config.method as string;
        console.log(`API Request -> ${url} [${method}]`);
        console.log(`Auth Token -> ${token}`);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return () => api.interceptors.request.eject(tokenInterceoptor);
}

// add Interceptors
errorLogger();
tokenInterceptors({ log: true });


export async function Signup(data:{
    full_name:string;
    email:string;
    password:string;
    passwordConfirm:string;
}){
    const res= await api.post<ApiTypes.SignupResponse>("/auth/signup",data)
    return res.data
  }
  export async function login(data:{
    email:string;
    password:string;
  }){
    const res= await api.post<ApiTypes.LoginResponse>("/auth/user/signin",data)
    await setAuthToken(res.data.accessToken)
    return res.data
}
export async function getUserDetials(){
    const res= await api.get<ApiTypes.GetUserDetailsResponse>("/auth/get-user-details")
    return res.data
}
export async function getInsurance(){
    const res= await api.get<ApiTypes.GetUserDetailsResponse>("/auth/get-user-details")
    return res.data
}


export async function sendtMessage({id,message}:{
  message:string;
  id?:string
}){
  const res= await api.post<ApiTypes.SendMessageResponse>((`/chatbot/message${id?`?sessionId=${id}`:""}`),{
    message
  },{
    
  })
  return res.data

}
export async function getChatMessages({id}:{
  id:string;
}){
  const res= await api.get<ApiTypes.GetChatHistoryResponse>(`/chatbot/history/${id}`,{
    
  })
  return res.data
}



