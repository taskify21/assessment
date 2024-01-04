"use client";
import AppWrapper from "./components/appWrapper";
import HomePage from "./components/home";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  } else {
    if (session.user.role == "admin") redirect("/dashboard");
    if (session.user.role == "delivery") redirect("/delivery");
  }

  return <AppWrapper>{<HomePage />}</AppWrapper>;
}
