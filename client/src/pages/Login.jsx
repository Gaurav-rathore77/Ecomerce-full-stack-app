import React from "react";
import Layout from "./../components/layout/Layout";
import "./login.css";
import { useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useAuth } from "../context/auth";
function Login() {

  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Login successfully") 
    try{
      const res = await axios.post ("http://localhost:8000/api/v1/auth/Login", {
      
        email,
        password,
      
      });
      if(res.data.success){
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        const abb = localStorage.setItem("auth", JSON.stringify(res.data));
        console.log(abb)
        navigate ("/");
      
      }
      else{
        toast.error(res.data.message);
      }
      
      
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center">
        {/* <div>Login</div> */}
        <form class="form"onSubmit={handleSubmit}>
          <p class="title">Login </p>
          <p class="message">login now and get full access to our app. </p>
          {/* <div class="flex"> */}
         


          <label>
            <input class="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" required="" />
            <span>Email</span>
          </label>

          <label>
            <input class="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" required="" />
            <span>Password</span>
          </label>
         
          <button class="submit">Submit</button>
          <p class="signin">
            Already have an acount ? <a href="#">Signin</a>{" "}
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
