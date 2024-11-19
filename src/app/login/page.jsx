'use client'


import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'



const MODE ={
  LOGIN : "LOGIN",
  REGISTER : "REGISTER",
  RESET_PASSWORD : "RESET_PASSWORD",
  EMAIL_VERIFICATION : "EMAIL_VERIFICATION",
}
const Loginpage = () => {
 const BASE_URL = 'http://localhost:8080/api/v1'
  const router = useRouter();
  const [mode, setMode] = useState(MODE.LOGIN);


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pathname = usePathname()
  // if (isLoggedIn) {
  //   router.push("/");
  // }
  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset Your Password"
          : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset"
          : "Verify";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")

    try {
      let response;
      switch (mode) {
        case MODE.REGISTER:
          response = await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
          break;
        case MODE.LOGIN:
          response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
          console.log(response)
          localStorage.setItem("token",response.data.token)
          break;
        case MODE.RESET_PASSWORD:
          response = await axios.post(`${BASE_URL}/user/reset-password`, { email, emailCode, password });
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await axios.post(`${BASE_URL}/user/verify-email`, { email, emailCode });
          break;
        default:
          throw new Error('Invalid mode');
      }

      setMessage(response.data.message);
      router.push('/'); // Redirect on success (example)
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  


  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="john"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}


        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </div>
        )}

        <button
          className="bg-pink-500 text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have and account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}


      </form>
    </div>
  )
}

export default Loginpage
