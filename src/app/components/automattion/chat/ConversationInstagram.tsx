
'use client'
import React, { useState, useEffect, useRef } from "react";

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
import ChatMessage from "../../chatbots/ChatMessage";
import ChatMessageAuto from "./ChatMessageAuto";
import WindowLinkedIn from "../rrss/WindowLinkedIn";
import WindowInstagram from "../rrss/WindowInstagram";

interface ChatWindowProps {
  onClose: () => void;
}


const ConversationInstagram = () => {
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
    <div className='w-full relative'>
              <WindowInstagram/>
{/*                 
                  <h1 className="sticky top-0 text-xl font-bold text-center text-purple-600 mb-4">Hola</h1>
        <div className="flex-1 overflow-y-auto p-3 ">
        
            {messages.map((message, index) => (
              <ChatMessageAuto
                key={index}
                message={message.text}
                time={message.time}
                isBot={message.sender === "bot"}
              />
            ))}
            {isTyping && botTypingMessage && (
              <ChatMessageAuto
                message={botTypingMessage}
                time={getCurrentTime()}
                isBot={true}
              />
            )} */}

            {/* Mostrar el spinner cuando el bot está "escribiendo" */}
            {/* {isTyping && !botTypingMessage && (
              <div className="self-start">
                <SyncLoader size={8} color="#333" />
              </div>
            )} */}

          

            {/* Div para hacer scroll automático */}
            {/* <div ref={messagesEndRef} />
          </div> */}
    </div>
  )
}

export default ConversationInstagram