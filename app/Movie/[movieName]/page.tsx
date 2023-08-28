"use client";
import React, { useEffect } from "react";
import MoviePage from "@/components/MoviePage";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { storeUser } from "@/app/recoil/atom/storeUser";

const Movie = () => {
  const router = useRouter();
  const user = useRecoilValue(storeUser);
  useEffect(() => {
    if (!user._id) router.push("/login");
  }, []);
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);
  return (
    <main>
      <MoviePage />
    </main>
  );
};

export default Movie;
