"use client"

import React from 'react'

import { useLoginPosts } from '@/app/hooks/useLoginPosts';



const loginPage = () => {

  const{mutate: loginList } = useLoginPosts()

  const loginInfo = (formData: FormData) => {
      loginList({
        email:String(formData.get("email")),
        password: String(formData.get("password")),
      })
  }


  return (
    <form action={loginInfo}>
      <div className="flex justify-center content-center w-100% mt-20">
          <div className="flex flex-col justify-center bg-gray-400 p-20 rounded-2xl w-100 h-auto text-black"> 
              <h1 className="text-4xl font-bold text-center -mt-5 mb-10">Login</h1>
              <label className="text-xl">Email:</label>
              <input className="text-lg border p-2 bg-white text-black rounded-lg mb-5" id="email" type="email" name="email" required placeholder='Enter your email' />
              <label className="text-xl">Password:</label>
              <input className="text-lg border p-2 bg-white text-black rounded-lg" id="password" type="password" name="password" required placeholder='Enter your password' />
              <button className="-mb-16 bg-blue-300 p-3 rounded-lg hover:bg-blue-400 mt-6">Login</button>
              <a className="flex flex-row justify-center mt-20"><span><a className="text-blue-700 mr-2" href="./register">Signup</a></span>|<span><a className="text-blue-700 ml-2" href="./forgot-password">Forgot your Password?</a></span></a>
          </div>
      </div>
    </form>
  )
}

export default loginPage