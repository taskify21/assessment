"use client";
// import React from "react";
import Header from "../header";
import Footer from "../footer";
import React, { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoadingFallback = () => (
  <div className=" fixed left-0 top-0 z-10 flex min-h-screen  w-full items-center justify-center bg-white/50">
    loading...
  </div>
);

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (status === "unauthenticated") {
        push("/login");
      } else if (status === "authenticated") {
        setLoggedIn(true);
      }
    };

    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!loggedIn) return <LoadingFallback />;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="flex min-h-screen flex-col items-center justify-between bg-main-900 text-white">
        <Header />
        <div className="w-full">{children}</div>
        <Footer />
      </div>
    </Suspense>
  );
}
