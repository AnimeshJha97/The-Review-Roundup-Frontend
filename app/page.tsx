"use client";

import Hero from "@/components/Hero";
import TopInCategory from "@/components/TopInCategory";
import LongBanner from "@/components/LongBanner";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { storeUser } from "./recoil/atom/storeUser";

export default function Home() {
  const router = useRouter();
  const user = useRecoilValue(storeUser);
  useEffect(() => {
    if (!user._id) router.push("/login");
  }, []);
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center pb-[400px]">
      <div>
        {/* Hero Section */}
        <Hero />

        {/* Top Movies in Category */}
        <TopInCategory type={"Movies"} />

        {/* Banner */}
        <LongBanner type={"Movies"} />

        {/* Top Tv Series in Category */}
        <TopInCategory type={"Tv Series"} />

        {/* Top Destinations in Category */}
        <TopInCategory type={"Destinations"} />

        {/* Top Live Shows in Category */}
        <TopInCategory type={"Live Shows"} />

        {/* Top Books in Category */}
        <TopInCategory type={"Books"} />

        {/* Top Cafes in Category */}
        {/* <TopInCategory type={'Cafes'} /> */}
        {/* Latest News */}
      </div>
    </main>
  );
}
