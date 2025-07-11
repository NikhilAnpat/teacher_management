"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        router.replace("/auth/login");
      }
    }
  }, [router]);

  return <Layout>{children}</Layout>;
} 