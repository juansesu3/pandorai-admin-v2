'use client'
import React from 'react';
import { IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiArticleFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

const Editing = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-[#0d0f11] w-full p-4 pb-0">
      {/* Tablist con DaisyUI */}
      <div role="tablist" className="tabs tabs-lifted w-full">
        {/* Tab 1 */}
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label="LinkedIn"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content   rounded-box p-6  h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
          <div className='flex flex-col items-start justify-center h-full'>
            <div className="flex items-start gap-2 mb-4">
              <IoLogoLinkedin className='text-blue-500' size={23} />
              <h2 className="font-bold">LinkedIn</h2>
            </div>
            <p>Aquí puedes editar tu contenido para LinkedIn.
            </p>
            <div className="flex-shrink-0 p-4 bg-white dark:bg-base-100 border-gray-200 dark:border-base-300  mt-auto w-full">
              <div className="max-w-lg mx-auto ">
              <label className="input input-bordered flex items-center justify-between gap-2 bg-white dark:bg-base-100 border-gray-200 dark:border-gray-500">
                  <input type="text" className="grow max-w-lg" placeholder="Dar instrucciones..." />
                  <button className=" hover:text-purple-600 transition-all duration-300 "><IoSend size={23} /></button>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Tab 2 */}
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label="Instagram"
        />
        <div
          role="tabpanel"
          className="tab-content   rounded-box p-6  h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
          <div className='flex flex-col items-start justify-center h-full'>
            <div className="flex items-center gap-2 mb-4">
              <IoLogoInstagram className="text-pink-500" size={23} />
              <h2 className="font-bold">Instagram</h2>
            </div>
            <p>Ajusta tu copy para Instagram, añade hashtags o emojis.</p>
            <div className="flex-shrink-0 p-4  mt-auto w-full bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
              <div className="max-w-lg mx-auto ">
              <label className="input input-bordered flex items-center justify-between gap-2 bg-white dark:bg-base-100 border-gray-200 dark:border-gray-500">
                  <input type="text" className="grow max-w-lg" placeholder="Dar instrucciones..." />
                  <button className=" hover:text-purple-600 transition-all duration-300 "><IoSend size={23} /></button>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Tab 3 */}
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label="Blog"
        />
        <div
          role="tabpanel"
          className="tab-content   rounded-box p-6  h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
          <div className='flex flex-col items-start justify-center h-full'>
            <div className="flex items-center gap-2 mb-4">
              <RiArticleFill className='text-purple-500' size={23} />
              <h2 className="font-bold">Blog</h2>
            </div>
            <p>Crea o edita un artículo más extenso para Medium o tu blog personal.</p>
            <div className="flex-shrink-0 p-4 bg-white dark:bg-base-100 border-gray-200 dark:border-base-300 mt-auto w-full">
              <div className="max-w-lg mx-auto ">
              <label className="input input-bordered flex items-center justify-between gap-2 bg-white dark:bg-base-100 border-gray-200 dark:border-gray-500">
                  <input type="text" className="grow max-w-lg" placeholder="Dar instrucciones..." />
                  <button className=" hover:text-purple-600 transition-all duration-300 "><IoSend size={23} /></button>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Tab 4 */}
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label="X"
        />
        <div
          role="tabpanel"
          className="tab-content   rounded-box p-6  h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
          <div className='flex flex-col items-start justify-center h-full'>
            <div className="flex items-center gap-2 mb-4">
              <FaSquareXTwitter className="text-blue-700" size={23} />
              <h2 className="font-bold">X (Twitter)</h2>
            </div>
            <p>Ajusta tu tweet antes de publicarlo.</p>
            <div className="flex-shrink-0 p-4 bg-white dark:bg-base-100 border-gray-200 dark:border-base-300  mt-auto w-full">
              <div className="max-w-lg mx-auto ">
                <label className="input input-bordered flex items-center justify-between gap-2 bg-white dark:bg-base-100 border-gray-200 dark:border-gray-500">
                  <input type="text" className="grow max-w-lg " placeholder="Dar instrucciones..." />
                  <button className=" hover:text-purple-600 transition-all duration-300 "><IoSend size={23} /></button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sección inferior fija */}
    </div>
  );
};

export default Editing;
