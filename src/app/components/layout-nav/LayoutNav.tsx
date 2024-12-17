"use client";
import { persistor, store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import UiChatBot from "../chatbots/UiChatBot";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutNav: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />

          {/* Main content area */}
          <div className="flex flex-col flex-1 w-0">
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <main className="flex-1 overflow-auto ">
              {children}
              <UiChatBot />
            </main>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default LayoutNav;
