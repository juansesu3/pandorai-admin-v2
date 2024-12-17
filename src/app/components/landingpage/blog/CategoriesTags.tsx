"use client";

import React, { useEffect, useState } from "react";
import { fetchCategories, fetchTags } from "@/redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { CategoryType, TagType } from "@/types/Blog";

type SupportedLocales = "en" | "es" | "fr" | "de" | "it";
const CategoriesTags = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const pathname = usePathname();
  const localeFromPath = (pathname.split("/")[1] || "en") as SupportedLocales;
  const [locale, setLocale] = useState<SupportedLocales>(localeFromPath);
  const dispatch: AppDispatch = useDispatch();
  const {
    categories,
    tags,
    loadingCategories,
    loadingTags,
    errorCategories,
    errorTags,
  } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    setLocale(localeFromPath);
  }, [localeFromPath]);

  // Fetch categories and tags on component mount
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
    if (tags.length === 0) {
      dispatch(fetchTags());
    }
  }, [dispatch, categories.length, tags.length]);

  const handleAddTag = () => {
    // Agrega lógica para guardar un nuevo tag si es necesario
    if (tagInput.trim() !== "") {
      console.log("Tag added:", tagInput);
      setTagInput("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories and Tags</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            className="border dark:border-gray-800 border-gray-200 p-2 rounded w-full"
            placeholder="Enter category name"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              console.log("Category creation logic can go here");
            }}
          >
            Add
          </button>
        </div>
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : errorCategories ? (
          <p className="text-red-500">Error: {errorCategories}</p>
        ) : (
          <ul className="list-disc pl-5">
            {categories.map((category: CategoryType, index:number) => (
              <li key={index} className="text-gray-700">
                {category?.translations?.[locale]}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            className="border dark:border-gray-800 border-gray-200 p-2 rounded w-full"
            placeholder="Enter tag name"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        {loadingTags ? (
          <p>Loading tags...</p>
        ) : errorTags ? (
          <p className="text-red-500">Error: {errorTags}</p>
        ) : (
          <ul className="list-disc pl-5">
            {tags.map((tag:TagType, index: number) => (
              <li key={index} className="text-gray-700">
                {tag?.translations?.[locale]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoriesTags;
