'use client';
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  objective: string; // Nuevo campo: Objetivo de la visita
  notes: string; // Nuevo campo: Notas adicionales
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


const ClientsTable: React.FC = () => {

const pathname = usePathname();
const localeFromPath = pathname.split("/")[1] || "en";
const [locale, setLocale] = useState(localeFromPath);

useEffect(() => {
  setLocale(localeFromPath);
}, [localeFromPath]);

  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/${locale}/clients/${id}`);
  };

  return (
    <div className=" mx-auto  ">
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      <div className="overflow-x-auto bg-white rounded-md   border border-gray-200 ">
        <div className="overflow-x-auto  ">
          <table className="w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="border p-3">ID</th>
                <th className="border p-3">Empresa</th>
                <th className="border p-3">Contacto</th>
                <th className="border p-3">Teléfono</th>
                <th className="border p-3">Correo</th>
                <th className="border p-3">Dirección</th>
                <th className="border p-3">Última Visita</th>
                <th className="border p-3">Próxima Visita</th>
                <th className="border p-3">Objetivo</th>
                <th className="border p-3">Notas</th>
                <th className="border p-3">Prioridad</th>
                <th className="border p-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.map((client) => (

                <tr key={client.id} onClick={() => handleRowClick(client.id)} className="hover:bg-gray-100 cursor-pointer">
                  <td className="border p-3">{client.id}</td>
                  <td className="border p-3">{client.company}</td>
                  <td className="border p-3">{client.contact}</td>
                  <td className="border p-3">{client.phone}</td>
                  <td className="border p-3">{client.email}</td>
                  <td className="border p-3">{client.address}</td>
                  <td className="border p-3">{client.lastVisit}</td>
                  <td className="border p-3">{client.nextVisit}</td>
                  <td className="border p-3">{client.objective}</td>
                  <td className="border p-3">{client.notes}</td>
                  <td
                    className={`border p-3 font-bold ${client.priority === "Alta"
                      ? "text-red-500"
                      : client.priority === "Media"
                        ? "text-yellow-500"
                        : "text-green-500"
                      }`}
                  >
                    {client.priority}
                  </td>
                  <td
                    className={`border p-3 ${client.status === "Pendiente"
                      ? "text-blue-500"
                      : client.status === "Realizada"
                        ? "text-green-500"
                        : "text-yellow-500"
                      }`}
                  >
                    {client.status}
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
