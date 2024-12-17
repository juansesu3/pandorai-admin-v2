'use client'
import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { FaPaperPlane } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { LuImagePlus } from "react-icons/lu";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { startChatR, addMessage } from "@/redux/chatbotSlice";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const [input, setInput] = useState("");
  const isChatStarted = useSelector(
    (state: RootState) => state.chatbot.isChatStarted
  );
  const [isTyping, setIsTyping] = useState(false); // Nuevo estado para "escribiendo"
  const [botTypingMessage, setBotTypingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referencia para el scroll
  const dispatch = useDispatch();
  const t = useTranslations('chatbot');

  // Función para obtener la hora actual
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        sender: "user" as const,
        text: input,
        time: getCurrentTime(),
      };
      dispatch(addMessage(newMessage));

      setInput("");

      // Iniciar el proceso de "escribiendo" del bot
      setIsTyping(true);
      setBotTypingMessage(null);

      try {
        // Realiza la llamada a la API
        const response = await axios.post(
          `http://localhost:8000/chatbot/query?query=${encodeURIComponent(
            input
          )}`
        );
        const botResponse = response.data.response.answer;
        const productData = response.data.products?.main_product || null;

        // Crear el mensaje del bot con la información del producto si existe
        const botMessage = {
          sender: "bot" as const,
          text: botResponse,
          time: getCurrentTime(),
          product: productData, // Añadir la información del producto al mensaje si está disponible
        };

        // Simular el tipeo del mensaje del bot
        typeBotMessage(botMessage);
      } catch (error) {
        console.error("Error al obtener la respuesta del bot:", error);
        const errorMessage = {
          sender: "bot" as const,
          text: "Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.",
          time: getCurrentTime(),
        };
        typeBotMessage(errorMessage);
      }
    }
  };

  // Manejar el inicio del chat y guardar el estado en localStorage
  const startChat = () => {
    dispatch(startChatR());

    // Iniciar la simulación de tipeo del mensaje de bienvenida
    setIsTyping(true);
    const welcomeMessage = {
      sender: "bot" as const,
      text: t('greetings'),
      time: getCurrentTime(),
    };

    setTimeout(() => {
      typeBotMessage(welcomeMessage);
    }, 2000); // Simular 2 segundos antes de que el bot empiece a escribir
  };

  // Función para simular que el bot escribe el mensaje carácter por carácter
  const typeBotMessage = (botMessage: {
    sender: "bot";
    text: string;
    time: string;
  }) => {
    let typedMessage = "";
    const typingInterval = setInterval(() => {
      if (typedMessage.length < botMessage.text.length) {
        typedMessage += botMessage.text[typedMessage.length];
        setBotTypingMessage(typedMessage);
      } else {
        clearInterval(typingInterval);
        setIsTyping(false); // Bot ha terminado de escribir
        dispatch(addMessage({ ...botMessage, text: typedMessage }));
      }
    }, 10); // Velocidad de escritura
  };

  // useEffect para manejar el scroll automático al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]); // Hacer scroll cada vez que cambian los mensajes o el estado de "isTyping"
  // Función para desplazar el carrusel hacia la izquierda

  return (
    <div className="fixed bottom-2 z-50 right-0 md:right-2 bg-white dark:bg-[#191d22] dark:border-dark-primary rounded-xl shadow-lg w-full sm:w-[500px] h-[650px] flex flex-col">
      {!isChatStarted ? (
        // Sección de bienvenida
        <div>
          <div className="bg-gradient-to-b  from-purple-600 to-purple-900 p-3 text-white rounded-t-xl">
            <div className="flex w-full justify-end mb-4 p-2">
              <button onClick={onClose} className="text-white">
                <CgClose color="white" size={20} />
              </button>
            </div>
            <div className="mb-8">
              <h1 className="text-xl"> {t('header')}</h1>
              <p className="font-light">
                👋 {t('intro')}
              </p>
            </div>
            <div className="flex w-full justify-center mb-4">
              <button onClick={startChat} className="">
                {t('start_chat')}
              </button>
            </div>
          </div>
          <div className="flex w-full justify-center items-center flex-col mt-4 px-4 gap-4">
            <h2 className="font-semibold"> {t('FAQ')}</h2>
            <button className=" shadow-xl border border-slate-800 p-2 w-full rounded-lg hover:bg-black hover:text-white flex items-start transition-all duration-300">
              {t('about_us')}
            </button>
            <button className="shadow-xl border border-slate-800 p-2 w-full rounded-lg hover:bg-black hover:text-white flex items-start transition-all duration-300">
              {t('our_services')}
            </button>
            <button className="shadow-xl border border-slate-800 p-2 w-full rounded-lg hover:bg-black hover:text-white flex items-start transition-all duration-300">
              {t('meeting')}
            </button>
          </div>
        </div>
      ) : (
        // Sección de chat
        <>
          <div className="flex justify-between items-center bg-gradient-to-b  from-[#761DDB] to-[#3F0F75] px-3 py-4 rounded-t-lg">
            <button>
              <IoIosArrowBack color="white" size={20} />
            </button>
            <h2 className="text-white font-semibold">Pandora</h2>
            <button onClick={onClose} className="text-white">
              <CgClose size={20} />
            </button>
          </div>
          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-3">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                time={message.time}
                isBot={message.sender === "bot"}
              />
            ))}
            {isTyping && botTypingMessage && (
              <ChatMessage
                message={botTypingMessage}
                time={getCurrentTime()}
                isBot={true}
              />
            )}

            {/* Mostrar el spinner cuando el bot está "escribiendo" */}
            {isTyping && !botTypingMessage && (
              <div className="self-start">
                <SyncLoader size={8} color="#333" />
              </div>
            )}

            {/* Div para hacer scroll automático */}
            <div ref={messagesEndRef} />
          </div>
          {/* Input de mensaje */}
          <div className="p-3 dark:border-dark-primary flex items-center">
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full text-blue-500 focus:outline-none transform transition-all duration-300"
            >
              <LuImagePlus size={23} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full p-2 border rounded-lg focus:outline-none bg-white text-black "
              placeholder={t('write_message')}
            />
            {/* Botón de enviar que solo aparece cuando hay texto */}
            <button
              onClick={handleSendMessage}
              className={`ml-2 p-2 rounded-full  hover:bg-[#7c00ff] bg-black text-white focus:outline-none transform transition-all duration-300 ${input.trim()
                  ? "opacity-100 translate-x-0"
                  : "hidden opacity-0 translate-x-5 pointer-events-none"
                }`}
            >
              <FaPaperPlane size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
