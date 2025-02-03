'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreation, finishLoading } from '@/redux/contentCreationSlice'; 
import axios from 'axios';

const IncialCreation = () => {
  const dispatch = useDispatch();
  const [idea, setIdea] = useState('');

  const handleStart = async () => {
    // Inicia el estado de carga inmediatamente
    dispatch(startCreation());

    try {
      const response = await axios.post(
        `http://localhost:8000/automation/interact/`,
        { content: idea }
      );

      console.log('Respuesta del servidor:', response.data);

      // Una vez que llega la respuesta, finalizamos la carga y pasamos el contenido
      dispatch(finishLoading(response.data.result));
    } catch (error) {
      console.error('Error al enviar la idea al backend:', error);
      // Manejo de errores: podrías despachar otra acción o manejar el estado para mostrar un mensaje de error
      // Por ejemplo: dispatch(errorLoading("Hubo un error al generar el contenido"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#0d0f11] w-full p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
        ¡Vamos a crear algo increíble hoy! 🚀
      </h1>
      <p className="text-gray-400 mb-6 text-center">
        Describe tu idea o concepto en el campo de abajo y comencemos.
      </p>

      <input
        type="text"
        placeholder="Escribe tu idea aquí..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="w-full max-w-md p-3 border dark:border-gray-500 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button 
        onClick={handleStart}
        className="mt-4 px-6 border-none py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
      >
        Enviar
      </button>
    </div>
  );
};

export default IncialCreation;
