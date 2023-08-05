import React, { useState } from 'react';
import { login } from "../util/auth";
import { setAuthToken } from "../util/auth";
import { useHistory } from "react-router-dom";


const Login =() => {
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    setLoading(true);
    setErrorMessage(null);
    login(useremail,username, password).then((data) => {
      if (data.token ==null) {
        setLoading(false);
        return setErrorMessage(data.status);
      }
      setLoading(false);
    });
  };

  const handleUseremail = (e) => {
    setUseremail(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }; 

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


    return(
        <div className="hero min-h-screen bg-base-200">
  <div className="flex-col justify-center hero-content lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="mb-5 text-5xl font-bold">
            IT鐵人賽
          </h1> 
      <p className="mb-5">
      30天全端挑戰!React+Spring Boot+Mongo DB 串接永豐API 打造金融網站 
          </p>
    </div> 
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">信箱</span>
          </label> 
          <input type="text" placeholder="email" className="input input-bordered" value={useremail} onChange={handleUseremail}/>
        </div> 
        <div className="form-control">
          <label className="label">
            <span className="label-text">帳號</span>
          </label> 
          <input type="text" placeholder="account" className="input input-bordered" value={username} onChange={handleUsername}/>
        </div>         
        <div className="form-control">
          <label className="label">
            <span className="label-text">密碼</span>
          </label> 
          <input placeholder="password" className="input input-bordered" type="password" value={password} onChange={handlePassword}/> 
          <label className="label">
          </label>
        </div> 
        {errorMessage && <><small style={{ color: 'red' }}>{errorMessage}</small><br /></>}<br/>
        <div className="form-control mt-6">
          <input type="button" className="btn btn-primary" value={loading ? '登入中...' : '登入'} onClick={handleLogin} disabled={loading} />
          
        </div>
      </div>
    </div>
  </div>
</div>
        )
    }
    export default Login        