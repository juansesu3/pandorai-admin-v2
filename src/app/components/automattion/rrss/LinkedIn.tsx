'use client'
import { RootState } from '@/redux/store';
import React, { useEffect, useRef, useState } from 'react';
import { IoLogoLinkedin, IoSend } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from "@/redux/chatbotSlice";
import axios from "axios";
import WindowLinkedIn from './WindowLinkedIn';
import Conversation from '../chat/Conversation';

const LinkedIn = () => {
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botTypingMessage, setBotTypingMessage] = useState<string | null>(null);
  const [focusLinkedIn, setFocusLinkedIn] = useState(false);  // Estado para rastrear el foco
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      dispatch(addMessage({ sender: "user", text: input, time: getCurrentTime() }));
      setInput("");
      setIsTyping(true);
      setBotTypingMessage(null);

      try {
        const response = await axios.post(`http://localhost:8000/chatbot/query?query=${encodeURIComponent(input)}`);
        const botResponse = response.data.response.answer;
        dispatch(addMessage({ sender: "bot", text: botResponse, time: getCurrentTime() }));
      } catch (error) {
        console.error("Error:", error);
        dispatch(addMessage({
          sender: "bot",
          text: "Error en la respuesta. Intenta nuevamente.",
          time: getCurrentTime()
        }));
      } finally {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="LinkedIn" defaultChecked />
      <div role="tabpanel" className="tab-content rounded-box p-6 h-[calc(100vh-10rem)] bg-white dark:bg-base-100 border-gray-200 dark:border-base-300">
        <div className=' flex flex-col items-start justify-center h-full w-full'>
          <div className="flex items-start gap-2 mb-4">
            <IoLogoLinkedin className='text-blue-500' size={23} />
            <h2 className="font-bold">LinkedIn</h2>
          </div>

          <div className=' overflow-x-scroll w-full'>
            <Conversation />
          </div>

          <div className="p-4 bg-white dark:bg-base-100 border-gray-200 dark:border-base-300 mt-auto w-full">
            <div className="max-w-lg mx-auto">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="grow"
                  placeholder="Dar instrucciones..."
                />
                <button onClick={handleSendMessage}>
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

export default LinkedIn;
