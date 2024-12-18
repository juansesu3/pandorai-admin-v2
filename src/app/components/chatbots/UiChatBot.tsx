"use client";

import React from "react";
import ChatWindow from "./ChatWindow";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { openChatWindow, closeChatWindow } from "@/redux/chatbotSlice";
import { RootState } from "@/redux/store";
import { VscRobot } from "react-icons/vsc";

const UiChatBot = () => {
  const dispatch = useDispatch();
  const isChatWindowOpen = useSelector(
    (state: RootState) => state.chatbot.isChatWindowOpen
  );

  // Función para manejar la apertura/cierre del chat usando Redux
  const toggleChat = () => {
    if (isChatWindowOpen) {
      dispatch(closeChatWindow());
    } else {
      dispatch(openChatWindow());
    }
  };
  return (
    <div>
      {/* Botón flotante para abrir/cerrar el chat */}
      <div
        className={`fixed hidden ${isChatWindowOpen ? "z-50 right-1 bottom-1" : "z-50 right-2 bottom-2"
          } `}
      >
        <div
          onClick={toggleChat}
          className={` ${isChatWindowOpen ? " hidden" : "rounded-full  p-2"
            } shadow-lg flex gap-2 items-center justify-center bg-purple-700 hover:bg-purple-600 transition-colors duration-300 cursor-pointer`}
        >
          {isChatWindowOpen ? (
            <>
              <CgClose color="white" className="font-bold" size={23} />
            </>
          ) : (
            <>
              <VscRobot className="text-white " size={26} />
            </>
          )}
        </div>
      </div>
      {/* Mostrar ventana de chat solo si está abierto */}
      {isChatWindowOpen && <ChatWindow onClose={toggleChat} />}
    </div>
  );
};

export default UiChatBot;
