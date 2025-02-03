"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import SelectField from "./SelectedField";

const ClientForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validaciones con Yup
  const validationSchema = Yup.object({
    company: Yup.string().required("El nombre de la empresa es obligatorio"),
    contact: Yup.string().required("El contacto es obligatorio"),
    phone: Yup.string().matches(/^[0-9\s+-]+$/, "Número de teléfono inválido"),
    email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    website: Yup.string().url("URL inválida"),
    lastVisit: Yup.date().required("Fecha obligatoria"),
    nextVisit: Yup.date().required("Fecha obligatoria"),
    priority: Yup.string().oneOf(["Alta", "Media", "Baja"]).required("Selecciona una prioridad"),
    status: Yup.string().oneOf(["Pendiente", "Realizada", "Reprogramada"]).required("Selecciona un estado"),
    objective: Yup.string().required("El objetivo es obligatorio"),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      company: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      website: "",
      lastVisit: "",
      nextVisit: "",
      priority: "Media",
      status: "Pendiente",
      objective: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError("");

      try {
        console.log("Cliente agregado:", values);
        alert("Cliente agregado con éxito");
        resetForm();
        router.push("/clientes"); // Redireccionar a la lista de clientes
      } catch (error) {
        setError("Ocurrió un error durante el registro");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-3xl bg-white dark:bg-[#0f182b] shadow-md rounded-lg p-6 m-4 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📝 Agregar Nuevo Cliente</h2>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Empresa */}
        <InputField label="Empresa" id="company" formik={formik} />

        {/* Contacto */}
        <InputField label="Contacto" id="contact" formik={formik} />

        {/* Teléfono */}
        <InputField label="Teléfono" id="phone" formik={formik} />

        {/* Email */}
        <InputField label="Correo Electrónico" id="email" type="email" formik={formik} />

        {/* Dirección */}
        <InputField label="Dirección" id="address" formik={formik} fullWidth />

        <InputField label="Web Site" id="website" type="url" formik={formik} fullWidth />

        {/* Última Visita */}
        <InputField label="Última Visita" id="lastVisit" type="date" formik={formik} />

        {/* Próxima Visita */}
        <InputField label="Próxima Visita" id="nextVisit" type="date" formik={formik} />

        {/* Prioridad */}
        <SelectField label="Prioridad" id="priority" options={["Alta", "Media", "Baja"]} formik={formik} />

        {/* Estado */}
        <SelectField label="Estado" id="status" options={["Pendiente", "Realizada", "Reprogramada"]} formik={formik} />

        {/* Objetivo */}
        <InputField label="Objetivo" id="objective" type="textarea" formik={formik} fullWidth />

        {/* Notas (Textarea) */}
        <InputField label="Notas" id="notes" type="textarea" formik={formik} fullWidth />

        {/* Botón de envío */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cliente"}
          </button>
        </div>

        {/* Error general */}
        {error && <p className="text-red-500 text-center md:col-span-2">{error}</p>}
      </form>
    </div>
  );
};

export default ClientForm;
