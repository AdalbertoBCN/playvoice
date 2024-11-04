// src/components/FriendList.tsx
import React from "react";
import { Lock, MessageCircle, Search, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

interface Friend {
  name: string;
  avatarUrl: string;
  online: boolean;
}

const friends: Friend[] = [
  { name: "KamiKat", avatarUrl: "http://localhost:3333/uploads/teste1.jpg", online: false },
  { name: "brTT", avatarUrl: "http://localhost:3333/uploads/teste1.jpg", online: true },
  { name: "LeoManeiro", avatarUrl: "http://localhost:3333/uploads/teste1.jpg", online: false },
];

const FriendList: React.FC = () => {
  async function getFriends() {
    const friends= await fetch("http://localhost:3333/user/:id")
  }



  return (
    <div className="bg-[#101010] w-64 h-full text-white">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <span className="font-semibold text-lg">Amigos</span>
        <div className="flex space-x-2">
         
            <UserPlus className="w-5 h-5 cursor-pointer hover:text-gray-200" /> {/* Ícone de adicionar amigo */}
          
         
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-200" /> {/* Ícone de procurar amigo */}
          
        </div>
      </div>
      <div className="p-4 space-y-4">
        {friends.map((friend, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={friend.avatarUrl}
              alt={friend.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <span className="text-sm font-medium">{friend.name}</span>
            </div>
           
              <MessageCircle className="w-5 h-5 cursor-pointer hover:text-gray-200" /> {/* Ícone de chat */}
          
              <Lock className="w-5 h-5 cursor-pointer hover:text-gray-200" /> {/* Ícone de cadeado */}
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
