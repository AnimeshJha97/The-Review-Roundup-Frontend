"use client";

import { storeUser } from "@/app/recoil/atom/storeUser";
import { getUserByUsername } from "@/lib/utils";
import { LoginUserInterface, UserInterface } from "@/model/model";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRecoilState } from "recoil";

const LoginForm = () => {
  const router = useRouter();
  const [eyeToggle, setEyeToggle] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  const [userDetails, setUserDetails] = useState<LoginUserInterface>({
    userName: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useRecoilState<UserInterface>(storeUser);

  useEffect(() => {
    console.log("userLogin userEffect[]", userLogin);
  }, []);

  useEffect(() => {
    console.log("userLogin userEffect[userLogin]", userLogin);
    if (userLogin._id) router.push("/");
  }, [userLogin]);

  const handleUserDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    e.preventDefault();
    if (field === "userName") {
      setUserDetails({ ...userDetails, userName: e.target.value });
    }
    if (field === "password") {
      setUserDetails({ ...userDetails, password: e.target.value });
    }
  };

  const validateLogin = async (): Promise<boolean> => {
    const user: { status: boolean; data: UserInterface | null } =
      await getUserByUsername(userDetails.userName);
    console.log("validateLogin user", user);

    if (user.status && user.data) {
      console.log("validateLogin user.status", user.status);
      setUserLogin(user.data);
      return true;
    }
    return false;
  };

  const handleLogin = async () => {
    setLoginClicked(true);
    const validFlag = await validateLogin();
    await setTimeout(
      () => console.log("handleLogin globalUser", userLogin),
      1000
    );

    setLoginValid(validFlag);
    // if (validFlag) {
    //   router.push("/");
    // }
  };

  return (
    <div className="flex-[0.46] pl-12">
      <p className="font-semibold text-xl mb-8">Login</p>
      <div className="flex flex-col items-end gap-4 pb-4">
        <div className="w-full flex flex-col gap-2">
          <p>User Name</p>
          <input
            style={{
              all: "unset",
              padding: "6px",
              borderRadius: "6px",
              boxShadow: "0 2px 6px 0 rgba(255,255,255,0.2)",
            }}
            type="text"
            value={userDetails.userName}
            placeholder="Enter your unique Username"
            onChange={(e) => handleUserDetailsChange(e, "userName")}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p>Password</p>
          <div className="relative flex items-center">
            <input
              style={{
                all: "unset",
                width: "100%",
                padding: "6px",
                borderRadius: "6px",
                boxShadow: "0 2px 6px 0 rgba(255,255,255,0.2)",
              }}
              type={eyeToggle ? "text" : "password"}
              value={userDetails.password}
              placeholder="Enter your Password"
              onChange={(e) => handleUserDetailsChange(e, "password")}
              required
            />
            {eyeToggle ? (
              <BsEyeSlashFill
                onClick={() => setEyeToggle(!eyeToggle)}
                className="absolute text-textWhite right-2"
              />
            ) : (
              <BsEyeFill
                onClick={() => setEyeToggle(!eyeToggle)}
                className="absolute text-textWhite right-2"
              />
            )}
          </div>
        </div>
        <div
          className={
            "w-full flex items-center" +
            `${loginClicked ? " justify-between" : " justify-end"}`
          }
        >
          {loginClicked && !loginValid ? (
            <p className="text-red-300 text-sm">
              Please re-check all the fields
            </p>
          ) : null}
          <button
            className="duration-300 transition-all border-[1px] bg-primary text-background hover:bg-transparent font-semibold hover:text-primary border-textWhite rounded-md mt-4 p-2 pr-8 pl-8"
            // {
            //   isValidatedUserDetails()
            //     ? "duration-300 transition-all border-[1px] bg-primary text-background hover:bg-transparent font-semibold hover:text-primary border-textWhite rounded-md mt-4 p-2 pr-8 pl-8"
            //     : "duration-300 border-[1px] bg-red-300 text-background font-semibold border-textWhite rounded-md mt-4 p-2 pr-8 pl-8"
            // }
            onClick={async (e) => await handleLogin()}
          >
            <p>Login</p>
          </button>
        </div>
      </div>
      <div>
        <p>
          New to the Plateform...{" "}
          <a className="ml-2 text-primary" href="/signup">
            Signup🚀
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
