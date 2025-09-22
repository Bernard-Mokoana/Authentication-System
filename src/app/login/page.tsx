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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="hidden md:block">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-2xl font-semibold">Auth System</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">Welcome back</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to continue to your account and manage your profile,
              security and preferences.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 p-6 sm:p-8">
            <h1 className="text-2xl font-bold mb-1">
              {loading ? "Processing..." : "Log in"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              New here?{" "}
              <Link className="text-blue-600 hover:underline" href="/signup">
                Create an account
              </Link>
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-neutral-700"
                  />
                  Remember me
                </label>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={onLogin}
                disabled={buttonDisabled || loading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-4 py-2 transition-colors"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
                <span className="text-xs text-gray-500">or</span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
              </div>
              <button
                onClick={() => toast.success("Demo login coming soon")}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-neutral-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM4 12a8 8 0 0113.856-5.32L6.68 17.856A7.963 7.963 0 014 12zm8 8a7.963 7.963 0 01-5.856-2.68L17.32 6.144A8 8 0 0112 20z" />
                </svg>
                Continue with SSO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
