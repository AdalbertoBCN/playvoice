import { Chat } from "@/types/Friend";
import { create } from "zustand";

interface Chats {
    chats: Chat[];
    setChats: (id:string) => Promise<void>;
    addMessage: (content: string, receiverId: string, senderId: string) => Promise<void>;
}

export const useChats = create<Chats>((set) => ({
    chats: [],
    setChats: async (id) => {
        const response = await fetch("http://localhost:3333/message/".concat(String(id)));
        const res = await response.json();

        set({ chats: res.chats });
    },
    addMessage: async (content, receiverId, senderId) => {
        set((state) => {
            const chat = state.chats.find(
                (chat) =>
                    (chat.user1Id === receiverId || chat.user2Id === receiverId)
            );

            if (chat) {
                chat.messages.push({
                    id: Math.random().toString(),
                    content,
                    senderId,
                    createdAt: new Date().toISOString(),
                });
            } else {
                state.chats.push({
                    id: Math.random().toString(),
                    user1Id: senderId,
                    user2Id: receiverId,
                    messages: [{
                        id: Math.random().toString(),
                        content,
                        senderId,
                        createdAt: new Date().toISOString(),
                    }],
                });
            }

            return state;
        });

        await fetch("http://localhost:3333/message", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content,
                user1Id: senderId,
                user2Id: receiverId,
            })
        });
    },
}))

