/* eslint-disable */
import FixHydra from "@/app/components/FixHydra";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import "../../../app/globals.css";

export default async function RootLayout({
  children,
  params,
}:{
  children: React.ReactNode;
  params: any;
}) {
  // Aquí simplemente destructuramos el locale sin await
  const { locale } = await params;
  // Obtener los mensajes correspondientes al locale
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Error fetching messages for locale: ${locale}`, error);
    messages = {}; // fallback para evitar errores si no se encuentran los mensajes
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FixHydra>
            <div className="min-h-screen bg-gray-100 dark:bg-black">
              {children}
            </div>
          </FixHydra>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
