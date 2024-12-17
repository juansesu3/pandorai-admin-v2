import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'es', 'fr', 'de', 'it'];
const defaultLocale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // Usa `await` para resolver `requestLocale`
  const locale = await requestLocale;

  // Determina el `finalLocale`: usa `locale` si es válido, o `defaultLocale` como fallback
  const finalLocale = locale && locales.includes(locale) ? locale : defaultLocale;

  // Carga los mensajes correspondientes al `finalLocale`
  try {
    return {
      messages: (await import(`../messages/${finalLocale}.json`)).default
    };
  } catch (error) {
    console.error(`Error loading messages for locale: ${finalLocale}`, error);
    // Si ocurre un error al cargar los mensajes, usa un objeto vacío
    return {
      messages: {}
    };
  }
});