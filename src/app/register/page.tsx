"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useAuth } from "../utils/useHooks/authHook";
import toast from "react-hot-toast";
import { IUser } from "../utils/type";
import { redirect } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Add the 'role' field to the initial state
  });

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    // For radio buttons, update the state only if the radio button is checked
    if (type === "radio" && !checked) {
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("confirm password didn't match");
      return;
    }

    if (loading) return;
    setLoading(true);

    register(
      { ...formData },
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
            <h1 className="text-4xl font-medium text-center pt-6">Register</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 px-10 mt-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your full name"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your phone no"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your address no"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your DOB"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your password"
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-lightGrey/50 p-4 border rounded"
                placeholder="Enter your confirm password"
              />

              <div className="flex gap-3 items-center">
                <p>Select role</p>
                <div className="flex items-center gap-1">
                  <p>user</p>
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="role"
                    value={"user"}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <label>Delivery</label>
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="role"
                    value={"delivery"}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center mb-4">
                <button
                  type="submit"
                  className="bg-gray px-20 text-white rounded font-bold py-2"
                >
                  {loading ? "Loading..." : "Signup"}
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
