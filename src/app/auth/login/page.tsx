"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../components/FeedbackToast"; // Adjust path if needed

export default function Login() {
  const [email, setEmail] = useState("nikhil@gmail.com");
  const [password, setPassword] = useState("1234");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setFormError("");
  
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    if (!valid) return;
  
    // Simulate credential validation
    const validEmail = "nikhil@gmail.com";
    const validPassword = "1234";
  
    if (email !== validEmail) {
      setEmailError("Email not found");
      return;
    }
  
    if (password !== validPassword) {
      setPasswordError("Incorrect password");
      return;
    }
  
    // If all matches
    localStorage.setItem("isLoggedIn", "true");
    toast.showToast("Login successful!", "success");
    router.push("/admin");
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {formError && <div className="mb-4 text-red-600">{formError}</div>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError("");
              setFormError(""); // Clear form error on change
            }}
          />
          {emailError && <div className="text-red-600 text-sm mt-1">{emailError}</div>}
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded border"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setPasswordError("");
              setFormError(""); // Clear form error on change
            }}
          />
          {passwordError && <div className="text-red-600 text-sm mt-1">{passwordError}</div>}
        </div>
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