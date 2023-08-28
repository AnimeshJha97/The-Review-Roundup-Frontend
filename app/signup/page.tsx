"use client";

import React, { useEffect } from "react";
import TrrLogo from "@/components/trrLogo";
import SignupForm from "@/components/SignupForm";
import { storeUser } from "@/app/recoil/atom/storeUser";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

const Signup = () => {
  const user = useRecoilValue(storeUser);
  const router = useRouter();
  useEffect(() => {
    if (user._id) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="h-screen w-screen pl-[120px] pr-[120px] text-textWhite flex justify-around items-center ">
      <TrrLogo />
      <div className="h-[600px] w-[1px] bg-textWhite opacity-40" />
      <SignupForm />
    </div>
  );
};

export default Signup;
