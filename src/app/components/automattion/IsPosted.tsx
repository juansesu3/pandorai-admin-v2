import React from 'react';
import { IoLogoLinkedin } from 'react-icons/io5';

const IsPosted = () => {
  return (
    <div className="flex items-center h-full w-full justify-center p-6 bg-green-100 text-green-800 rounded-md shadow-md">
      <div className="flex flex-col items-center gap-4">
        <IoLogoLinkedin size={60} className="text-green-600" />
        <h3 className="text-2xl font-bold">¡Publicación Exitosa!</h3>
        <p className="text-md">Tu publicación ha sido compartida en LinkedIn.</p>
        <div className="flex gap-4 mt-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Crear otro post
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsPosted;
