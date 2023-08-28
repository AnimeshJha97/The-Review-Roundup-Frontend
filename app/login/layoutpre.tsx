"use client";

import GlobalRecoilRoot from "@/app/recoilRoot/GlobalRecoilRoot";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Review RoundUp",
  description:
    'Looking for reliable reviews on the latest movies, TV series, popular destinations, books, live shows, and cafes? Our review website offers unbiased opinions and ratings to help you make informed decisions. Explore our diverse range of reviews and find the perfect entertainment, travel, or reading experience. Discover the best movies, binge-worthy TV series, breathtaking destinations, captivating books, thrilling live shows, and cozy cafes that match your preferences. Trust our dedicated reviewers to guide you in finding your next favorite entertainment, travel, or leisure spot. Start exploring today! In this metadata description, the focus is on highlighting the key offerings of your review website, such as providing honest and reliable reviews across various categories. It also emphasizes the wide range of options available, ensuring that visitors can find reviews for their preferred genres or interests. Additionally, the use of keywords like "movies," "TV series," "destinations," "books," "live shows," and "cafes" helps to optimize the description for search engine visibility. Remember to keep the metadata concise, engaging, and informative, with a clear call-to-action to encourage users to visit your website. Also, make sure to tailor it to your specific website and audience to maximize its effectiveness.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <GlobalRecoilRoot>{children}</GlobalRecoilRoot>
      </body>
    </html>
  );
}
