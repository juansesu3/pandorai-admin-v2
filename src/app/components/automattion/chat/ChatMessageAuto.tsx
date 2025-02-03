"use client";
import React from "react";
import "daisyui/dist/full.css"; // Asegúrate de que esto esté correcto
import "tailwindcss/tailwind.css"; // Asegúrate de importar también Tailwind CSS
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ChatMessageProps {
    message: string;
    time: string;
    isBot?: boolean; // Nueva propiedad para identificar si el mensaje es del bot
}

const ChatMessageAuto: React.FC<ChatMessageProps> = ({ message, time, isBot }) => {
    const t = useTranslations("chatbot");

    return (
        <div className={`chat ${isBot ? "chat-start" : "chat-end"} mb-4`}>
            {isBot ? (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image
                            alt="Avatar"
                            width={500}
                            height={500}
                            src={
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="chat-image avatar">
                    <div className="avatar placeholder">
                        <div className="bg-[#7c00ff] text-white w-8 rounded-full p-1">
                            <span>{t('you')}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className={`chat-header `}>
                <time className="text-gray-400 text-sm text-right pr-2">{time}</time>
            </div>

            <div
                className={`chat-bubble ${isBot ? "bg-transparent p-0 py-4  text-gray-100" : " bg-base-400 text-white"
                    }  `}
            >
                {message}
            </div>
            <div className="chat-footer opacity-50">
                {isBot ? t("delivered") : `${t("see")} ${time}`}
            </div>
        </div>
    );
};

export default ChatMessageAuto;
