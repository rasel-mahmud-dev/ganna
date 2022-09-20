import React from 'react';
import "./style.scss";


const LoginPage = () => {
    return (
        <div className="login-form">
            <h1>Login Here</h1>
            <form action="">
                <input type="text" placeholder="Enter Your Email" />
                <br/>
                <br/>
                <input type="password" placeholder="Enter Your Password" />
                
                <br/>
                <br/>
                
                <button className="btn btn-primary">Login</button>
                
            </form>
  </div>
    );
};

export default LoginPage;