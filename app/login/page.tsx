"use client";

import React, { useEffect } from "react";
import TrrLogo from "@/components/trrLogo";
import LoginForm from "@/components/LoginForm";
import { storeUser } from "@/app/recoil/atom/storeUser";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

const Login = () => {
  const user = useRecoilValue(storeUser);
  const router = useRouter();

  useEffect(() => {
    if (user._id) {
      console.log("login useEffect user", user);
      // router.push("/");
    }
  }, []);
  useEffect(() => {
    if (user._id) {
      console.log("login useEffect[user] user", user);
      // router.push("/");
    }
  }, [user]);

  return (
    <div className="h-screen w-screen pl-[120px] pr-[120px] text-textWhite flex justify-around items-center ">
      <TrrLogo />
      <div className="h-[600px] w-[1px] bg-textWhite opacity-40" />
      <LoginForm />
    </div>
  );
};

export default Login;
