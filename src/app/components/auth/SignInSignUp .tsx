"use client";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { serialize } from "cookie";
import { login } from "@/utils/auth";
import Link from "next/link";

const SignInSignUp = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("login"); // Las traducciones están en un namespace llamado "navbar"
  const { theme, setTheme } = useTheme();
  const localeFromPath = pathname.split("/")[1] || "en"; // Detectar el idioma de la ruta actual
  const [locale, setLocale] = useState(localeFromPath);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Estado de error

  // Estados para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLocale(localeFromPath);
  }, [localeFromPath]);

  const handleChangeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    const newPathname = `/${selectedLanguage}${pathname.replace(
      /^\/[a-z]{2}/,
      ""
    )}`;
    router.push(newPathname);
  };

  // Validación manual
  const validate = () => {
    if (!email || !password) {
      setError(t("credentials.credentials_warnning"));
      return false;
    }

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      setError(t("credentials.error_email"));
      return false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(t("credentials.error_password"));
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario

    if (!validate()) {
      return;
    }

    setLoading(true); // Activa el estado de carga

    try {
      // Llama a la función de autenticación
      const { access_token } = await login(email, password);

      // Guardar el token en una cookie
      document.cookie = serialize("token", access_token, {
        path: "/",
        maxAge: 3600,
      });

      // Redirige a la página de dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError(t("credentials.error_login"));
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="flex justify-center items-center  px-1 min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#0f182b] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-600 ">
            PandorAI
          </h2>
          <div className="flex flex-col gap-1 mb-8">
            <p className="text-lg font-semibold dark:text-gray-100 text-black">
              {t("title")}
            </p>

            <p className="text-md font-light text-gray-400">
              {t("sub_title")}
            </p>
          </div>
        </div>
        {/* Mostrar mensaje de error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            id="email"
            name="email"
            className={`dark:bg-[#0f182b] dark:text-white peer px-4 pt-6 pb-2 border border-neutral-200 dark:border-neutral-800 dark:focus:border-blue-600 rounded-md w-full focus:outline-none`}
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label
            htmlFor="email"
            className="absolute top-1 left-2 text-gray-500  transition-all duration-300 ease-in-out transform -translate-y-0 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 dark:peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-gray-500  peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600"
          >
            {t("credentials.email")}
          </label>
        </div>

        {/* Contraseña */}
        <div className="relative mb-4">
          <input
            type="password"
            id="password"
            name="password"
            className={`dark:bg-[#0f182b] dark:text-white peer px-4 pt-6 pb-2 border border-neutral-200 dark:border-neutral-800 dark:focus:border-blue-600 rounded-md w-full focus:outline-none`}
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label
            htmlFor="password"
            className="absolute top-1 left-2 text-gray-500 transition-all duration-300 ease-in-out transform -translate-y-0 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 dark:peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600"
          >
            {t("credentials.password")}
          </label>
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          disabled={loading} // Desactiva el botón si está cargando
        >
          {loading ? t("loading") : t("button")}
        </button>

        {/* Opción de registro */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t("info_login")}{" "}
            <Link href="/register" className="text-purple-500 hover:text-blue-700">
              {t("sign_up")}
            </Link>
          </p>
        </div>

        {/* Opciones de tema e idioma */}
        <div
          className={`flex items-center gap-2 justify-center mt-4   mx-auto`}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              } relative border border-neutral-100 dark:border-slate-600 inline-flex items-center h-7 rounded-full w-12 transition-colors focus:outline-none`}
          >
            <span className="sr-only">Toggle Dark Mode</span>
            <span
              className={`${theme === "dark"
                ? "translate-x-6 bg-blue-500"
                : "translate-x-1 bg-gray-400"
                } w-5 h-5 transform  rounded-full transition-transform flex items-center justify-center`}
            >
              {theme === "dark" ? (
                <MdDarkMode className="w-3 h-3 text-yellow-300" />
              ) : (
                <MdLightMode className="w-3 h-3 text-yellow-500" />
              )}
            </span>
          </button>
          <div className="relative">
            <select
              onChange={handleChangeLocale}
              value={locale}
              className="p-1 dark:text-white text-xs text-gray-500 rounded-md bg-white border border-neutral-100 dark:border-slate-600 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInSignUp;
