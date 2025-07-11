"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("nikhil@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    if (email === "nikhil@gmail.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 rounded border"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-3 py-2 rounded border"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        <div className="mt-4 text-center">
          <a href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
        </div>
        <div className="mt-2 text-center text-sm">
          Don&apos;t have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
} 