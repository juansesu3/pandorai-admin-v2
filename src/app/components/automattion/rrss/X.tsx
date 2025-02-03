'use client'
import React from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Definición de tipos
interface Message {
  content: string;
}

interface TwitterContentCreator {
  messages: Message[];
}

interface DataItem {
  twitter_content_creator?: TwitterContentCreator;
}

const X = () => {
  const content = useSelector((state: RootState) => state.contentCreation.content);

  let twitterMessage = 'No se pudo obtener el contenido de Twitter';

  console.log("Tipo de content:", typeof content, content);

  if (typeof content === 'string') {
    try {
      const data: DataItem[] = JSON.parse(content);
      // Buscamos el objeto con "twitter_content_creator".
      const twitterObj = data.find((item) => item.twitter_content_creator);
      if (twitterObj?.twitter_content_creator?.messages?.[0]?.content) {
        twitterMessage = twitterObj.twitter_content_creator.messages[0].content;
      }
    } catch (error) {
      console.error("Error al parsear el contenido:", error);
    }
  } else if (Array.isArray(content)) {
    const data: DataItem[] = content;
    const twitterObj = data.find((item) => item.twitter_content_creator);
    if (twitterObj?.twitter_content_creator?.messages?.[0]?.content) {
      twitterMessage = twitterObj.twitter_content_creator.messages[0].content;
    }
  }

  return (
    <>
      <input
        type="radio"
        name="my_tabs"
        role="tab"
        className="tab"
        aria-label="X"
      />
      <div
        role="tabpanel"
        className="tab-content rounded-box p-6 h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300"
      >
        <div className='flex flex-col items-start justify-center h-full'>
          <div className="flex items-center gap-2 mb-4">
            <FaSquareXTwitter className="text-blue-700" size={23} />
            <h2 className="font-bold">X (Twitter)</h2>
          </div>
          <p className='overflow-y-scroll w-full p-4 rounded-lg'>
            {twitterMessage}
          </p>
          <div className="flex-shrink-0 p-4 bg-white dark:bg-base-100 border-gray-200 dark:border-gray-300 mt-auto w-full">
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

export default X;
