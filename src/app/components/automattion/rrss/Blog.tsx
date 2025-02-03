'use client'
import { RootState } from '@/redux/store';
import React from 'react';
import { IoLogoRss, IoSend } from 'react-icons/io5';
import { useSelector } from 'react-redux';

// Definir los tipos necesarios
interface Message {
  content: string;
}

interface BlogManagerData {
  messages: Message[];
}

interface DataItem {
  blog_manager?: BlogManagerData;
}

const BlogManager = () => {
  const content = useSelector((state: RootState) => state.contentCreation.content);

  let blogMessage = 'No se pudo obtener el contenido del Blog Manager';

  console.log("Tipo de content:", typeof content, content);

  if (typeof content === 'string') {
    // Si es una cadena, intentamos parsear como JSON
    try {
      const data: DataItem[] = JSON.parse(content);
      // data debería ser un array de objetos. Buscamos el que contenga "blog_manager".
      const blogObj = data.find((item) => item.blog_manager);
      if (blogObj?.blog_manager?.messages?.[0]?.content) {
        blogMessage = blogObj.blog_manager.messages[0].content;
      }
    } catch (error) {
      console.error("Error al parsear el contenido:", error);
    }
  } else if (Array.isArray(content)) {
    // Si ya es un array, no necesitamos parsear
    const data: DataItem[] = content;
    const blogObj = data.find((item) => item.blog_manager);
    if (blogObj?.blog_manager?.messages?.[0]?.content) {
      blogMessage = blogObj.blog_manager.messages[0].content;
    }
  }

  return (
    <>
      <input
        type="radio"
        name="my_tabs"
        role="tab"
        className="tab"
        aria-label="Blog"
      />
      <div
        role="tabpanel"
        className="tab-content rounded-box p-6 h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300"
      >
        <div className='flex flex-col items-start justify-center h-full'>
          <div className="flex items-center gap-2 mb-4">
            <IoLogoRss className="text-orange-500" size={23} />
            <h2 className="font-bold">Blog Manager</h2>
          </div>
          <p className='overflow-y-scroll w-full p-4 rounded-lg '>
            {blogMessage}
          </p>
          <div className="flex-shrink-0 p-4 mt-auto w-full bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
            <div className="max-w-lg mx-auto">
              <label className="input input-bordered flex items-center justify-between gap-2 bg-white dark:bg-base-100 border-gray-200 dark:border-gray-500">
                <input type="text" className="grow max-w-lg" placeholder="Dar instrucciones..." />
                <button className="hover:text-purple-600 transition-all duration-300">
                  <IoSend size={23} />
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogManager;
