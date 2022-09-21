import api from "../../axios";
import {ACTION_TYPES} from "../types";

export async function loginAction(userData: { email: string, password: string }, dispatch: any, cb: (data: any)=> void){
    try{
        const {data, status} = await api.post("/api/v1/auth/login", userData)
        if(status === 201) {
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: {
                    user: data.user,
                    token: data.token
                }
            })
            cb(data)
        }
        
    } catch (ex){
        cb(null)
    }
}
export async function loginWihToken(dispatch: any){
    try{
        (api.defaults.headers as any)["authorization"] = localStorage.getItem("token")
        const {data, status} = await api.get("/api/v1/auth/login-token")
        if(status === 201) {
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: {
                    user: data.user
                }
            })
        }
        
    } catch (ex){
    }
}