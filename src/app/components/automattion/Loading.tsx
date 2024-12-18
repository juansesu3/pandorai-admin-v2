'use client'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCreationProgress, finishLoading } from '@/redux/contentCreationSlice';
import { RootState } from '@/redux/store';

const Loading = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.contentCreation.progress);

  useEffect(() => {
    // Simulación de incremento de progreso
    const interval = setInterval(() => {
      dispatch(setCreationProgress(Math.min(progress + 10, 100)));
    }, 500);

    // Si el progreso llega a 100%, cambiamos a editing
    if (progress >= 100) {
      dispatch(finishLoading("Aquí iría el contenido generado por el modelo"));
    }

    return () => clearInterval(interval);
  }, [dispatch, progress]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#0d0f11] w-full p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">Creando contenido...</h1>
      <p className="text-gray-400 mb-6 text-center">Por favor, espera mientras generamos tu contenido.</p>
      <div className="w-full max-w-md bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
