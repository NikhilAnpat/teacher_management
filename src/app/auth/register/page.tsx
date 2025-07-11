"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy register logic
    if (name && email && password) {
      // Save user logic here
      router.push("/auth/login");
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-3 py-2 rounded border"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Register</button>
        <div className="mt-4 text-center text-sm">
          Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
} 