"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup successful!");
      console.log("Signup  successful!", response);
      router.push("/login");
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="container mx-auto w-fit h-full p-6 m-20 bg-gray-800 rounded-lg shadow-md flex flex-col justify-center">
      <h1 className="flex justify-center items-center mb-3 pb-2 font-bold shadow-cyan-100 text-2xl">{loading ? "Processing" : "Signup"}</h1>
      {/* <label className="" htmlFor="username">username</label> */}
      <input
        className="p-2 m-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      {/* <label htmlFor="email">email</label> */}
      <input
        className="p-2 m-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      {/* <label htmlFor="password">password</label> */}
      <input
        className="p-2 m-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-2 m-2 border border-gray-300 bg-blue-900 shadow-2xl hover:bg-gray-900 rounded-lg mb-4 focus:outline-none focus::border-gray-600"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link className="flex items-center justify-center " href="/login">Visit login page</Link>
    </div>
  );
}
