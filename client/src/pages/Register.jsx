import React from "react";
import Layout from "./../components/layout/Layout";
import "./register.css";
import { useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import axios from "axios";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Register successfully") 
    try{
      const res = await axios.post ("http://localhost:8000/api/v1/auth/register", {
        username,
        email,
        password,
        phone,
        address,
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate ("/login");
      
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
        {/* <div>Register</div> */}
        <form class="form"onSubmit={handleSubmit}>
          <p class="title">Register </p>
          <p class="message">Signup now and get full access to our app. </p>
          {/* <div class="flex"> */}
          <label>
            <input class="input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="" required="" />
            <span>username</span>
          </label>

          <label>
            <input class="input" value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" placeholder="" required="" />
            <span>phone</span>
          </label>
          {/* </div>   */}

          <label>
            <input class="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" required="" />
            <span>Email</span>
          </label>

          <label>
            <input class="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" required="" />
            <span>Password</span>
          </label>
          <label>
            <input class="input" value={address} onChange={(e) => setAddress(e.target.value)} type="address" placeholder="" required="" />
            <span>address</span>
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

export default Register;
