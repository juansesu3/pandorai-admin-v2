"use client";
// components/BlogTable.tsx
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchArticles } from "@/redux/blogSlice";
import { usePathname } from "next/navigation";

const BlogTable = () => {
  const pathname = usePathname();
  const localeFromPath = pathname.split("/")[1] || "en";
  const [locale, setLocale] = useState(localeFromPath);
  const dispatch: AppDispatch = useDispatch();

  const { articles } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    setLocale(localeFromPath);
  }, [localeFromPath]);

  useEffect(() => {
    if (articles.length === 0) {
      // Solo carga los artículos si no están en el estado
      dispatch(fetchArticles());
    }
  }, [dispatch, articles.length]);

  return (
    <div className="overflow-x-auto rounded-md shadow-md bg-white dark:bg-[#191d22]">
      <table className="table w-full  rounded-md  bg-white dark:bg-[#191d22]">
        <thead>
          <tr>
            <th className="text-gray-400">Nombre</th>
            <th className="text-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.slug}>
              <td>{article?.translations?.[locale]?.name}</td>
              <td>
                <button className=" py-1 px-2 rounded-md outline-none text-white dark:bg-gray-400 bg-gray-300 mr-2">
                  <CiEdit size={23} />
                </button>
                <button className=" py-1 px-2 rounded-md outline-none dark:bg-red-600 bg-red-500  text-white">
                  <MdOutlineDeleteSweep size={23} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
