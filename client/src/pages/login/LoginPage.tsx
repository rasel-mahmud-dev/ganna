import React, {ChangeEvent, FormEventHandler, useState} from 'react';
import "./style.scss";
import useStore from "../../store/useStore";
import api from "../../axios";
import {ACTION_TYPES} from "../../store/types";


const LoginPage = () => {
    
    const [state, dispatch] =  useStore()

    
    const [userData, setUserData] = useState<{email: string, password: string}>({
        email: "",
        password: ""
    })
    
    function handleChange(e: ChangeEvent){
        let ele = e.target as HTMLInputElement
        setUserData({
            ...userData,
            [ele.name]: ele.value
        })
    }
    
    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        
        let errorMessage = ""
        let userDataKey: keyof {email: string, password: string};
        
        for (userDataKey in userData) {
            if(!userData[userDataKey]){
                errorMessage = ""
            }
        }
        
        if(errorMessage){
            alert(errorMessage)
            return;
        }
        
        const {data, status} = await api.post("/api/v1/auth/login", userData)
        if(status === 201) {
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: {
                    user: data.user,
                    token: data.token
                }
            })
        }
    }
    
    return (
        <div className="login-form">
            <h1>Login Here</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" value={userData.email} onChange={handleChange}  type="text" placeholder="Enter Your Email" />
                <br/>
                <br/>
                <input name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Enter Your Password" />
                
                <br/>
                <br/>
                
                <button type="submit" className="btn btn-primary">Login</button>
                
            </form>
  </div>
    );
};

export default LoginPage;