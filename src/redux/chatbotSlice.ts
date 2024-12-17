import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    time: string;
}

interface ChatState {
    isChatStarted: boolean;     // Indica si el chat ha sido iniciado alguna vez
    isChatWindowOpen: boolean;  // Indica si la ventana del chat está actualmente abierta
    messages: ChatMessage[];
}

const initialState: ChatState = {
    isChatStarted: false,
    isChatWindowOpen: false,
    messages: [],
};

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState,
    reducers: {
        startChatR: (state) => {
            state.isChatStarted = true;
             // Abrir la ventana del chat cuando se inicia el chat
        },
        openChatWindow: (state) => {
            state.isChatWindowOpen = true; // Abre la ventana del chat sin reiniciar el estado de inicio
        },
        closeChatWindow: (state) => {
            state.isChatWindowOpen = false; // Cierra la ventana del chat pero no reinicia el estado de inicio
        },
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload);
        },
    },
});

export const { startChatR, openChatWindow, closeChatWindow, addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
