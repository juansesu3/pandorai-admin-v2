// components/FormArticle.tsx
"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlinePhotograph } from "react-icons/hi"; // Icono para subir foto
import Select from "react-select";
import { useTranslations } from "next-intl";
import { Article, CategoryType, TagType, TranslationsType } from "@/types/Blog";
import { AxiosError } from "axios";
interface User {
  name: string;
  profile_image_url: string;
}

const MyEditor = dynamic(
  () => import("@/app/components/landingpage/blog/create-article/MyEditor"),
  {
    ssr: false,
  }
);

// Traducciones iniciales para manejar varios idiomas
const initialTranslations: TranslationsType = {
  en: { name: "", content: "" },
  es: { name: "", content: "" },
  fr: { name: "", content: "" },
  de: { name: "", content: "" },
  it: { name: "", content: "" },
};

const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

interface FormArticleProps {
  article?: Article;
}

const FormArticle: React.FC<FormArticleProps> = ({ article }) => {
  const router = useRouter();
  const [articleImage, setArticleImage] = useState<string | File>(
    article?.articleImage || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artCat, setArtCat] = useState<CategoryType[]>([]);
  const [artTag, setArtTag] = useState<TagType[]>([]);

  const [userAuthenticated, setUserAuthenticated] = useState<User | null>(null);

  const pathname = usePathname();
  const t = useTranslations("blog");
  const localeFromPath = pathname.split("/")[1] || "en";
  const [locale, setLocale] = useState(localeFromPath);


  useEffect(() => {
    setLocale(localeFromPath);
  }, [localeFromPath]);

  const handleSubmitUploadS3 = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = ev.target.files?.[0];
    if (file) {
      setArticleImage(file);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.link) {
          formik.setFieldValue("articleImage", data.link);
        } else {
          throw new Error("No link returned from upload");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserAuthenticated = async () => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const token = getCookie("token");
    try {
      const response = await axios.get("https://backend-pandorai-960512295965.europe-west6.run.app/user/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setUserAuthenticated(response.data.user);
      } else {
        setError("Failed to fetch authenticated user.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the authenticated user.");
    }
  };

  useEffect(() => {
    getUserAuthenticated();
  }, []);



  const formik = useFormik({
    initialValues: {
      translations: article?.translations || initialTranslations,
      articleCat: article?.articleCat || "",
      articleImage: article?.articleImage || "",
      tags: article?.tags || [],
      likes: article?.likes || 0,
      shareCount: article?.shareCount || 0,
      articleAuthor: "",
      imgAuthor: "",
    },
    validationSchema: Yup.object({
      translations: Yup.object({
        en: Yup.object({
          name: Yup.string().required(t("form.article_name_required.en")),
          content: Yup.string().required(t("form.article_content_required.en")),
        }),
        es: Yup.object({
          name: Yup.string().required(t("form.article_name_required.es")),
          content: Yup.string().required(t("form.article_content_required.es")),
        }),
        fr: Yup.object({
          name: Yup.string().required(t("form.article_name_required.fr")),
          content: Yup.string().required(t("form.article_content_required.fr")),
        }),
        de: Yup.object({
          name: Yup.string().required(t("form.article_name_required.de")),
          content: Yup.string().required(t("form.article_content_required.de")),
        }),
        it: Yup.object({
          name: Yup.string().required(t("form.article_name_required.it")),
          content: Yup.string().required(t("form.article_content_required.it")),
        }),
      }).required(t("form.translations_rquiered")),
      articleCat: Yup.string().required(t("form.category_required")),
      articleImage: Yup.string().required(t("form.image_required")),
      tags: Yup.array()
        .of(Yup.string().required(t("form.tag_required")))
        .min(1, "At least one tag is required"),
      likes: Yup.number()
        .min(0, "Likes cannot be negative")
        .required("Required"),
      shareCount: Yup.number()
        .min(0, "Share count cannot be negative")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };
      const token = getCookie("token");

      try {
        const slug = createSlug(values.translations.en.name);
        const valuesWithSlug = { ...values, slug };

        const method = article?.id ? "put" : "post";
        const url = article?.id
          ? `https://backend-pandorai-960512295965.europe-west6.run.app/articles/articles/${article.id}`
          : "https://backend-pandorai-960512295965.europe-west6.run.app/articles/articles/";

        const response = await axios({
          method,
          url,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: valuesWithSlug,
        });

        if (response.status === 200 || response.status === 201) {
          router.push("/landing-page/blog");
        }
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || "An error occurred");

      }
    },
  });

  useEffect(() => {
    if (userAuthenticated) {
      formik.setFieldValue("articleAuthor", userAuthenticated.name);
      formik.setFieldValue("imgAuthor", userAuthenticated.profile_image_url);
    }
  }, [userAuthenticated, formik]);
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const token = getCookie("token");
    const fetchArtCat = async () => {
      try {
        const response = await axios.get<CategoryType[]>(
          "https://backend-pandorai-960512295965.europe-west6.run.app/category/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtCat(response.data);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    const fetchArtTags = async () => {
      try {
        const response = await axios.get<TagType[]>("https://backend-pandorai-960512295965.europe-west6.run.app/tag/tags", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtTag(response.data);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchArtTags();
    fetchArtCat();
  }, []);

  const tagOptions = artTag.map((tag: TagType) => ({
    label: tag.translations[locale as keyof typeof tag.translations],
    id: tag.id,
  }));
  const imageUrl =
    articleImage instanceof File
      ? URL.createObjectURL(articleImage)
      : formik.values.articleImage;

  useEffect(() => {
    console.log("tagOptions:", tagOptions);
  }, [artTag, tagOptions]);

  useEffect(() => {
    console.log(loading, error);
  }, [loading, error]);
  return (
    <div className="  rounded-lg px-6">
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 bg-white dark:bg-[#191d22] p-4 rounded-lg"
        >
          {/* Sección para cada idioma */}
          {(Object.keys(formik.values.translations) as string[]).map((lang) => (
              <div key={lang} className="mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  {lang.toUpperCase()} Translation
                </h3>

                <label
                  htmlFor={`translations.${lang}.name`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {`${t('form.article_name')} (${lang.toUpperCase()})`}
                </label>
                <input
                  id={`translations.${lang}.name`}
                  name={`translations.${lang}.name`}
                  type="text"
                  value={formik.values.translations[lang].name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full rounded-md border ${formik.touched.translations?.[lang]?.name &&
                    formik.errors.translations?.[lang]?.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                    } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white`}
                />
                {formik.touched.translations?.[lang]?.name &&
                  formik.errors.translations?.[lang]?.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {formik.errors.translations[lang]?.name}
                    </p>
                  )}
                {/* Contenido del artículo */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {`${t('form.article_content')} (${lang.toUpperCase()})`}
                  </label>
                  <MyEditor
                    value={formik.values.translations[lang].content}
                    onChange={(content) =>
                      formik.setFieldValue(
                        `translations.${lang}.content`,
                        content
                      )
                    }
                  />
                  {formik.touched.translations?.[lang]?.content &&
                    formik.errors.translations?.[lang]?.content && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {formik.errors.translations[lang]?.content}
                      </p>
                    )}
                </div>
              </div>
            ))}

          {/* Categoría del artículo */}
          <div className="mt-4">
            <label
              htmlFor="articleCat"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Article Category
            </label>
            <select
              id="articleCat"
              name="articleCat"
              value={formik.values.articleCat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full rounded-md border ${formik.touched.articleCat && formik.errors.articleCat
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white`}
            >
              <option value="">Select a category</option>
              {artCat.map((category: CategoryType) => (
                <option key={category.id} value={category.id}>
                  {category.translations.en}
                </option>
              ))}
            </select>
            {formik.touched.articleCat && formik.errors.articleCat && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {formik.errors.articleCat}
              </p>
            )}
          </div>

          {/* Subir imagen del artículo */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Article Image
            </label>
            <label className="relative w-32 h-32 rounded-lg flex flex-col bg-gray-800 border border-gray-200 cursor-pointer mt-2">
              <div className="flex justify-center items-center w-32 h-32">
                {imageUrl ? (
                  <Image
                    width={128}
                    height={128}
                    alt="article-image"
                    src={imageUrl}
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-white">Upload Image</span>
                )}
                <div className="absolute bottom-2 right-0 bg-gray-500 border border-white rounded-full w-7 h-7 flex justify-center items-center">
                  <HiOutlinePhotograph className="text-white w-5 h-5" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSubmitUploadS3}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </label>
            {formik.touched.articleImage && formik.errors.articleImage && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {formik.errors.articleImage}
              </p>
            )}
          </div>

          {/* Tags del artículo */}
          <div className="mt-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags
            </label>
            <Select
              id="tags"
              name="tags"
              options={tagOptions}
              isClearable
              value={null} // Esto hace que el selector se "resetee" después de cada selección
              onChange={(selectedOption) => {
                if (selectedOption) {
                  const selectedValue = selectedOption.id; // Usamos option.id como el valor único del tag
                  const newTags = [...formik.values.tags, selectedValue]; // Agregamos solo el nuevo tag
                  formik.setFieldValue("tags", newTags);
                }
              }}
              onBlur={() => formik.setFieldTouched("tags", true)}
              classNamePrefix="react-select"
              className={`mt-1 block w-full bg-black rounded-md border ${formik.touched.tags && formik.errors.tags
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white`}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formik.values.tags.map((tagId, index) => {
                const tag = tagOptions.find((option) => option.id === tagId);
                return (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag?.label}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => {
                        const updatedTags = formik.values.tags.filter(
                          (t) => t !== tagId
                        );
                        formik.setFieldValue("tags", updatedTags);
                      }}
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
            </div>
            {formik.touched.tags && formik.errors.tags && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {formik.errors.tags}
              </p>
            )}
          </div>

          {/* Autor del artículo */}
          <div className="mt-4">
            <label
              htmlFor="articleAuthor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Author
            </label>
            <input
              id="articleAuthor"
              name="articleAuthor"
              type="text"
              value={formik.values.articleAuthor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {formik.touched.articleAuthor && formik.errors.articleAuthor && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {formik.errors.articleAuthor}
              </p>
            )}
          </div>

          {/* Imagen del autor */}
          <div className="mt-4 hidden">
            <label
              htmlFor="imgAuthor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Image Author
            </label>
            <div className="mt-1 flex items-center ">
              <Image
                width={500}
                height={500}
                src={userAuthenticated?.profile_image_url||''}
                alt="Author Image"
                className="h-8 w-8 rounded-full"
              />
              <input
                id="imgAuthor"
                name="imgAuthor"
                type="text"
                value={formik.values.imgAuthor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
                className="ml-2 flex-1 w-full hidden rounded-md border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            {formik.touched.imgAuthor && formik.errors.imgAuthor && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {formik.errors.imgAuthor}
              </p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {article ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormArticle;
