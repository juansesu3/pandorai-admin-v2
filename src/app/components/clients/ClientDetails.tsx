"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";

interface Client {
  id: number;
  company: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextVisit: string;
  priority: "Alta" | "Media" | "Baja";
  status: "Pendiente" | "Realizada" | "Reprogramada";
  objective: string;
  notes: string;
}

const clientsData: Client[] = [
  {
    id: 1,
    company: "Tech Solutions",
    contact: "Juan Pérez",
    phone: "+52 55 1234 5678",
    email: "juan@techsolutions.com",
    address: "Av. Reforma 123, CDMX",
    lastVisit: "2024-01-15",
    nextVisit: "2024-02-10",
    priority: "Alta",
    status: "Pendiente",
    objective: "Presentar nueva propuesta de servicio",
    notes: "Cliente interesado en descuentos por volumen",
  },
  {
    id: 2,
    company: "Innova Corp",
    contact: "María López",
    phone: "+52 55 8765 4321",
    email: "maria@innovacorp.com",
    address: "Calle Ficticia 456, GDL",
    lastVisit: "2024-01-10",
    nextVisit: "2024-02-15",
    priority: "Media",
    status: "Realizada",
    objective: "Revisión de contrato y términos de servicio",
    notes: "Solicitó ajustes en las cláusulas de renovación",
  },
];

const ClientDetails = () => {
      const pathname = usePathname();
      const localeFromPath = pathname.split("/")[1] || "en";
      const [locale, setLocale] = useState(localeFromPath);
    
      useEffect(() => {
        setLocale(localeFromPath);
      }, [localeFromPath]);
  const router = useRouter();
  const { id } = useParams();
  
  // Buscar el cliente por ID
  const client = clientsData.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Cliente no encontrado</h1>
        <button
          onClick={() => router.push(`/${locale}/clients`)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Volver a la Lista
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-[#0f182b] shadow-md rounded-lg p-6 m-4">
      {/* Botón de regreso */}
      <button
        onClick={() => router.push(`/${locale}/clients`)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition"
      >
        <FiArrowLeft className="mr-2" /> Volver a la Lista
      </button>

      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{client.company}</h1>
      <p className="text-gray-500 dark:text-gray-400">{client.contact}</p>

      {/* Información General */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem label="Teléfono" value={client.phone} />
        <DetailItem label="Correo" value={client.email} />
        <DetailItem label="Dirección" value={client.address} fullWidth />
        <DetailItem label="Última Visita" value={client.lastVisit} />
        <DetailItem label="Próxima Visita" value={client.nextVisit} />
        <DetailItem label="Objetivo" value={client.objective} fullWidth />
        <DetailItem label="Notas" value={client.notes} fullWidth />

        {/* Estado y Prioridad con Colores */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <span className="text-gray-600 dark:text-gray-400">Prioridad:</span>
          <span
            className={`ml-2 font-bold ${
              client.priority === "Alta"
                ? "text-red-500"
                : client.priority === "Media"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {client.priority}
          </span>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <span className="text-gray-600 dark:text-gray-400">Estado:</span>
          <span
            className={`ml-2 font-bold ${
              client.status === "Pendiente"
                ? "text-blue-500"
                : client.status === "Realizada"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            {client.status}
          </span>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => alert("Editar cliente")}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <FiEdit className="mr-2" /> Editar
        </button>
        <button
          onClick={() => alert("Eliminar cliente")}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <FiTrash2 className="mr-2" /> Eliminar
        </button>
      </div>
    </div>
  );
};

// Componente reutilizable para mostrar información
const DetailItem = ({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) => {
  return (
    <div className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-md ${fullWidth ? "md:col-span-2" : ""}`}>
      <span className="text-gray-600 dark:text-gray-400">{label}:</span>
      <span className="ml-2 text-gray-800 dark:text-white">{value}</span>
    </div>
  );
};

export default ClientDetails;
