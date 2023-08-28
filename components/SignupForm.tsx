"use client";

import React, { useState, useEffect } from "react";
import { avatars, cloudinaryUrl } from "@/data/avatarData";
import Image from "next/image";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  validateEmail,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RegisterUserInterface } from "@/model/model";

interface avatarInterface {
  url: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<RegisterUserInterface>({
    userName: "",
    email: "",
    password: "",
    avatar: {
      url: "",
    },
  });
  const [signupStep, setSignupStep] = useState(1);
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(-1);
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [signupStep1Valid, setSignupStep1Valid] = useState(false);

  const matchPassword = (): boolean => {
    if (reEnteredPassword === "") return false;
    if (userDetails.password === "") return false;
    return reEnteredPassword === userDetails.password;
  };

  useEffect(() => {
    setNextClicked(false);
    console.log("userDetails", userDetails);
  }, [userDetails, reEnteredPassword]);
  // empty check for user details
  // email formate check
  // password match check
  const validateAll = async (): Promise<boolean> => {
    const isEmailValid = validateEmail(userDetails.email);
    const isPasswordMatch = matchPassword();
    setIsEmailValidated(isEmailValid);
    setIsPasswordMatched(isPasswordMatch);
    let flag = false;
    if (
      userDetails.userName !== "" &&
      userDetails.password !== "" &&
      userDetails.email !== "" &&
      isPasswordMatch &&
      isEmailValid
    ) {
      flag = true;
    }

    if (flag) {
      const userByEmail = await getUserByEmail(userDetails.email);
      const userByUserName = await getUserByUsername(userDetails.userName);

      const isUniqueEmail = !userByEmail.status;
      const isUniqueUsername = !userByUserName.status;

      if (isUniqueEmail && isUniqueUsername) return true;
    }
    return false;
  };

  const handleNext = async () => {
    setNextClicked(true);
    const validFlag = await validateAll();
    setSignupStep1Valid(validFlag);
    if (validFlag) {
      setSignupStep(signupStep + 1);
    }
  };

  const handleBack = () => {
    setSignupStep(signupStep - 1);
  };

  const handleUserDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    e.preventDefault();
    if (field === "email") {
      setUserDetails({ ...userDetails, email: e.target.value });
    }
    if (field === "userName") {
      setUserDetails({ ...userDetails, userName: e.target.value });
    }
    if (field === "password") {
      setUserDetails({ ...userDetails, password: e.target.value });
    }
  };

  const handleAvatarClick = (avatar: avatarInterface) => {
    setUserDetails({ ...userDetails, avatar: avatar });
  };

  const handleSubmit = async () => {
    const registered = await createUser(userDetails);
    if (registered) router.push("/login");
    else alert("User Registration failed!!👀");
  };

  return (
    <div className="flex-[0.5]">
      {signupStep === 1 && (
        <SignupStep1
          isEmailValidated={isEmailValidated}
          handleNext={handleNext}
          handleUserDetailsChange={handleUserDetailsChange}
          setReEnteredPassword={setReEnteredPassword}
          isPasswordMatched={isPasswordMatched}
          userDetails={userDetails}
          reEnteredPassword={reEnteredPassword}
          signupStep1Valid={signupStep1Valid}
          nextClicked={nextClicked}
        />
      )}

      {signupStep === 2 && (
        <SignupStep2
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          handleAvatarClick={handleAvatarClick}
          selectedAvatarIndex={selectedAvatarIndex}
          setSelectedAvatarIndex={setSelectedAvatarIndex}
        />
      )}

      <div className="pl-12">
        <p>
          Already have a account...{" "}
          <a className="ml-2 text-primary" href="/login">
            Login🚀
          </a>
        </p>
      </div>
    </div>
  );
};

const SignupStep1 = ({
  isEmailValidated,
  handleNext,
  handleUserDetailsChange,
  setReEnteredPassword,
  isPasswordMatched,
  userDetails,
  reEnteredPassword,
  signupStep1Valid,
  nextClicked,
}: {
  isEmailValidated: boolean;
  handleNext: () => Promise<void>;
  handleUserDetailsChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  setReEnteredPassword: React.Dispatch<React.SetStateAction<string>>;
  isPasswordMatched: boolean | any;
  userDetails: RegisterUserInterface;
  reEnteredPassword: string;
  signupStep1Valid: boolean;
  nextClicked: boolean;
}) => {
  const [eyeToggle, setEyeToggle] = useState(false);
  return (
    <div className="pl-12 pb-4">
      <p className="font-semibold text-xl mb-8">Register</p>
      <div className="flex flex-col items-end gap-4">
        <div className="w-full flex flex-col gap-2">
          <p>Email Id</p>
          <input
            style={{
              all: "unset",
              padding: "6px",
              borderRadius: "6px",
              boxShadow: "0 2px 6px 0 rgba(255,255,255,0.2)",
              border: nextClicked
                ? isEmailValidated
                  ? "none"
                  : "1px solid red"
                : "none",
            }}
            type="email"
            value={userDetails.email}
            placeholder="Enter your Email Id"
            onChange={(e) => handleUserDetailsChange(e, "email")}
            required
          />
        </div>
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
        <div className="w-full flex flex-col gap-2">
          <p>Re-enter Password</p>
          <input
            style={{
              all: "unset",
              padding: "6px",
              borderRadius: "6px",
              boxShadow: "0 2px 6px 0 rgba(255,255,255,0.2)",
              border: nextClicked
                ? isPasswordMatched
                  ? "1px solid green"
                  : "1px solid red"
                : "none",
            }}
            type="text"
            value={reEnteredPassword}
            placeholder="Re-enter your Password"
            onChange={(e) => setReEnteredPassword(e.target.value)}
            required
          />
        </div>
        <div
          className={
            "w-full flex items-center" +
            `${nextClicked ? " justify-between" : " justify-end"}`
          }
        >
          {nextClicked && !signupStep1Valid ? (
            <p className="text-red-300 text-sm">
              Please re-check all the fields
            </p>
          ) : null}
          <button
            className="duration-300 transition-all border-[1px] bg-primary text-background hover:bg-transparent font-semibold hover:text-primary border-textWhite rounded-md mt-4 p-2 pr-8 pl-8"
            onClick={async (e) => await handleNext()}
          >
            <p>Next</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const SignupStep2 = ({
  handleBack,
  handleSubmit,
  handleAvatarClick,
  selectedAvatarIndex,
  setSelectedAvatarIndex,
}: {
  handleBack: () => void;
  handleSubmit: () => void;
  handleAvatarClick: (avatar: avatarInterface) => void;
  selectedAvatarIndex: number;
  setSelectedAvatarIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="pl-12 pb-4">
      <p className="font-semibold text-xl mb-8">Register</p>
      <div className="grid grid-cols-3 gap-8 place-items-center">
        {avatars.map((avatar, i) => (
          <div key={i} className="group">
            <Image
              width={320}
              height={320}
              className={
                selectedAvatarIndex === i
                  ? "w-[120px] h-[120px] transition-all duration-300 rounded-lg cursor-pointer scale-[120%] shadow-[0_2px_12px_1px_rgba(0,168,204,0.9)]"
                  : "w-[120px] h-[120px] transition-all duration-300 rounded-lg cursor-pointer scale-100 group-hover:scale-[120%] hover:shadow-[0_2px_12px_0_rgba(0,168,204,1)]"
              }
              src={`${cloudinaryUrl}${avatar.url}`}
              alt={avatar.name}
              onClick={() => {
                const avatarObj = {
                  url: avatar.url,
                };
                handleAvatarClick(avatarObj);
                setSelectedAvatarIndex(i);
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between mt-4">
        <button
          className="duration-300 border-[1px] bg-transparent hover:text-background hover:bg-primary font-semibold text-primary border-textWhite rounded-md mt-4 p-2 pr-8 pl-8 group"
          onClick={(e) => handleBack()}
        >
          <p>Back</p>
        </button>
        <button
          className="duration-300 border-[1px] bg-primary text-background hover:bg-transparent font-semibold hover:text-primary border-textWhite rounded-md mt-4 p-2 pr-8 pl-8 group"
          onClick={(e) => handleSubmit()}
        >
          <p>Submit</p>
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
