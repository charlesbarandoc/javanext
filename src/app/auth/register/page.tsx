"use client"

import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react';

const registerUser = async ({name, email, password, password_confirmation}: {name: string, email: string, password: string, password_confirmation: string}) => {
  const response = await axios.post(
    "http://localhost:8000/api/register", 
    {name, email, password, password_confirmation}
    
  )
  return response;
}




const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const queryClient = useQueryClient();



  const {mutate: registerAdd, isPending} = useMutation(
    {mutationFn: registerUser, 
    mutationKey: ['users'],     
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]})
      console.log("success!")
    }});

    const handleRegister = (e) => {
    e.preventDefault(); 
    // console.log(name, email, password, password_confirmation)
    registerAdd({name, email, password, password_confirmation})
     
  }


  return (
    <div>
        <div className="flex justify-center content-center w-100% mt-10 mb-10"> 
            <form className="flex flex-col justify-center bg-gray-400 p-15 rounded-2xl w-100 h-auto text-black" onSubmit={handleRegister}>
                <h1 className="text-4xl font-bold text-center -mt-5 mb-10">Register</h1>
                <label className="text-xl" htmlFor="text">Name:</label>
                <input className="text-lg border p-2 bg-white text-black rounded-lg mb-5" type="name" placeholder='Enter your name' onChange={e => setName(e.target.value)}/>
                <label className="text-xl" htmlFor="text">Email:</label>
                <input className="text-lg border p-2 bg-white text-black rounded-lg mb-5" type="email" placeholder='Enter your email' onChange={e => setEmail(e.target.value)}/>
                <label className="text-xl" htmlFor="">Password:</label>
                <input className="text-lg border p-2 bg-white text-black rounded-lg mb-5" type="password" placeholder='Enter your password' onChange={e => setPassword(e.target.value)}/>
                <label className="text-xl" htmlFor="">Password Confirmaiton:</label>
                <input className="text-lg border p-2 bg-white text-black rounded-lg mb-5" type="password" placeholder='Re-enter password' onChange={e => setPasswordConfirmation(e.target.value)}/>
                <button className="-mb-16 bg-blue-300 p-3 rounded-lg hover:bg-blue-400 mt-6" type="submit">Register</button>
                <a className="flex flex-row justify-center mt-20"><span><a className="text-blue-700 mr-2" href="./login">Sign in</a></span>|<span><a className="text-blue-700 ml-2" href="./forgot-password">Forgot your Password?</a></span></a>               
            </form>
            
        </div>
    </div>
  )
}

export default RegisterPage