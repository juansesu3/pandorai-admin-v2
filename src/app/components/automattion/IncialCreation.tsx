'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreation } from '@/redux/contentCreationSlice'; 

const IncialCreation = () => {
  const dispatch = useDispatch();
  const [idea, setIdea] = useState('');

  const handleStart = () => {
    // Aquí podrías guardar la idea en algún estado global antes de empezar el proceso.
    dispatch(startCreation());
  }

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
