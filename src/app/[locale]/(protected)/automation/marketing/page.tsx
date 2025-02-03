// app/your-page/page.tsx
import type { Metadata } from 'next'
import React from 'react'
import PageContent from '@/app/components/automattion/PageContent'

/** 
 * Metadatos estáticos para tu página
 * (válido desde Next.js 13 App Router en adelante).
 */
export const metadata: Metadata = {
  title: 'Automatización de marketing',
  description: 'Breve descripción de la página.',
  icons: {
    icon: '/favicon.ico'
  },
  // Ejemplos de campos adicionales
  openGraph: {
    title: 'Título Open Graph',
    description: 'Descripción para redes sociales',
    url: 'https://midominio.com/your-page',
    images: [
      {
        url: 'https://midominio.com/imagen-og.jpg',
        width: 800,
        height: 600
      }
    ]
  }
}

export default function Page() {
  return <PageContent />
}
