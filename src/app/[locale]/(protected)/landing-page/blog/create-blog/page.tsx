import FormArticle from "@/app/components/landingpage/blog/create-article/FormArticle";
import Prompt from "@/app/components/landingpage/blog/create-article/Prompt";
import React from "react";

const page = () => {
  return (
    <div>
      <Prompt />
      <FormArticle />
    </div>
  );
};

export default page;
