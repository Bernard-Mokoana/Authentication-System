"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login Successful!");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto w-fit h-full p-6 m-30 shadow-2xl rounded-lg flex flex-col items-center justify-center  py-2 bg-gray-800">
      <h1 className="font-bold font-sans text-2xl m-3 p-1">{loading ? "Processing" : "Login"}</h1>
      <hr />
      {/* <label htmlFor="email">email</label> */}
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      {/* <label htmlFor="password">password</label> */}
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border bg-blue-900 hover:bg-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus::border-gray-600"
      >
        Login here
      </button>
      <Link className="shadow-2xl font-sans" href="/signup">Visit Signup page</Link>
    </div>
  );
}
