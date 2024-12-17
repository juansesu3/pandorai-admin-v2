// app/page.tsx
import React from "react";

import BlogTable from "@/app/components/landingpage/blog/BlogTable";
import IntroText from "@/app/components/landingpage/blog/IntroText";
import CategoriesTags from "@/app/components/landingpage/blog/CategoriesTags";
import Link from "next/link";

const Page: React.FC = () => (
  <div className="p-6 flex flex-col gap-4">
    <IntroText />
    <CategoriesTags />
    <Link
      href={"blog/create-blog"}
      className="bg-purple-600 mt-4 w-32 text-center hover:bg-purple-700 transition-all duration-300 shadow-sm text-white py-2 px-3 rounded-lg"
    >
      Create Article
    </Link>
    <BlogTable />
  </div>
);

export default Page;
