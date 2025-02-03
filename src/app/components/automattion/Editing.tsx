'use client'
import React from 'react';
import LinkedIn from './rrss/LinkedIn';
import Instagram from './rrss/Instagram';
import Blog from './rrss/Blog';
import X from './rrss/X';

const Editing = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-[#0d0f11] w-full p-4 pb-0">
      {/* Tablist con DaisyUI */}
      <div role="tablist" className="tabs tabs-lifted w-full">
        {/* Tab 1 */}
        <LinkedIn />
        {/* Tab 2 */}
        <Instagram />
        {/* Tab 3 */}
        <Blog />
        {/* Tab 4 */}
        <X />
      </div>
      {/* Sección inferior fija */}
    </div>
  );
};

export default Editing;
