'use client'
import React from 'react';
import { DotLoader } from 'react-spinners';


const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#0d0f11] w-full p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">Generando contenido...</h1>
      <p className="text-gray-400 mb-6 text-center">Por favor, espera mientras obtenemos tu contenido.</p>

      {/* Aquí puedes colocar un spinner, una barra de progreso estática o cualquier indicador visual de carga. */}
      <div className="loader"><DotLoader size={50} color="#00BFFF" /></div>
    </div>
  );
};

export default Loading;
