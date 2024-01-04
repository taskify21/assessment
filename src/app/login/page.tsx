"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useAuth } from "../utils/useHooks/authHook";
import toast from "react-hot-toast";
import { IUser } from "../utils/type";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    login(
      { email, password },
      async (res: any) => {
        const user: IUser = res.data.data;
        let url = "/";
        if (user.role == "admin") url = "/dashboard";
        if (user.role == "delivery") url = "/delivery";

        try {
          await signIn("credentials", {
            ...user,
            redirect: true,
            callbackUrl: url,
          });
        } catch (error) {
          console.log({ error });
          setLoading(false);
        }
        setLoading(false);
      },
      (err: any) => {
        console.log({ err });
        toast.error("Provided credentials are incorrect!", { duration: 800 });
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-main-900 text-white">
      <Header />
      <div className="w-full">
        <div className="bg-lightGrey/50 w-[98%] md:w-[90%] m-auto p-2 py-12 md:p-12">
          <div className="bg-white text-black md:w-[30rem] m-auto rounded">
            <h1 className="text-4xl font-medium text-center pt-6">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 px-10 mt-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your password"
              />
              <Link href={"/register"} className="text-blue ml-2">
                Register now!
              </Link>
              <div className="mt-4 flex items-center justify-center mb-4">
                <button
                  type="submit"
                  className="bg-gray px-20 text-white rounded font-bold py-2"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
