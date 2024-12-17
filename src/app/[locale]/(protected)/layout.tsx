/* eslint-disable */
import "../../../app/globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import FixHydra from "../../components/FixHydra";
import LayoutNav from "../../components/layout-nav/LayoutNav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}:{
  children: React.ReactNode;
  params: any ;
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
            <LayoutNav>{children}</LayoutNav>
          </FixHydra>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
