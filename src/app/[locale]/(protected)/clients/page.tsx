'use client';
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ClientsTable from '@/app/components/clients/ClientsTable'
import React from 'react'
import Link from 'next/link'

const Page = () => {

  const pathname = usePathname();
  const localeFromPath = pathname.split("/")[1] || "en";
  const [locale, setLocale] = useState(localeFromPath);

  useEffect(() => {
    setLocale(localeFromPath);
  }, [localeFromPath]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 Gestión de Clientes</h1>

      {/* Introducción */}
      <p className="text-gray-600 mb-6">
        Aquí puedes ver la lista de clientes, sus datos de contacto y el seguimiento de visitas.
        Usa el botón de abajo para agregar nuevos clientes.
      </p>

      {/* Botón para agregar clientes */}
      <div className="mb-6">
        <Link href={`/${locale}/clients/add-new-client`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
            ➕ Agregar Cliente
          </button>
        </Link>
      </div>

      {/* Tabla de clientes */}
      <ClientsTable />
    </div>
  )
}

export default Page
