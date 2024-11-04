// src/components/FriendList.tsx
import React from "react";
import { Lock, MessageSquare, Minus, Search, SendHorizonal, UserPlus, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";

interface Friend {
  name: string;
  avatarUrl: string;
  messages: string[];
}

const initialFriends: Friend[] = [
  { name: "KamiKat", avatarUrl: "http://localhost:3333/uploads/teste1.jpg", messages: [] },
  { name: "brTT", avatarUrl: "http://localhost:3333/uploads/teste1.jpg", messages: [] },
  { name: "LeoManeiro", avatarUrl: "http://localhost:3333/uploads/teste1.jpg", messages: [] },
];

const FriendList: React.FC = () => {
  const [isMessageCardOpen, setIsMessageCardOpen] = React.useState(false);
  const [selectedFriend, setSelectedFriend] = React.useState<string>(initialFriends[0].name);
  const [friendMessages, setFriendMessages] = React.useState<Friend[]>(initialFriends);

  const handleSendMessage = (newMessage:string) => {
    if (!newMessage.trim()) return;

    setFriendMessages((prev) =>
      prev.map((friend) =>
        friend.name === selectedFriend
          ? { ...friend, messages: [...friend.messages, newMessage] }
          : friend
      )
    );
  };

  function MessageCard() {
    if (!isMessageCardOpen) {
      return null;
    }

    const currentFriend = friendMessages.find((friend) => friend.name === selectedFriend);

    return (
      <Card className="flex flex-col w-96 h-80 border-none absolute bottom-0 right-64">
        <CardHeader className="flex-row space-x-1 items-center space-y-0 p-0 bg-[#101010] rounded-md">
          <X className="w-4 h-4 cursor-pointer hover:text-gray-300" onClick={() => setIsMessageCardOpen(false)} />
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="w-full h-full pt-6 bg-[#242424] flex items-start">
            <ToggleGroup
              type="single"
              defaultValue={selectedFriend}
              className="flex flex-col w-max px-1 border-r border-white/20 h-full justify-start"
            >
              {friendMessages.map((friend) => (
                <ToggleGroupItem
                  className="w-full hover:bg-[#101010] hover:opacity-80 hover:text-white data-[state=on]:bg-[#101010] h-max py-0.5"
                  key={friend.name}
                  value={friend.name}
                  onClick={() => setSelectedFriend(friend.name)}
                >
                  <span className="w-full text-start">{friend.name}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="w-full h-full px-2 py-3 flex flex-col justify-end gap-y-2">
              <div className="grid grid-flow-row gap-y-1 w-full">
                {currentFriend?.messages.map((msg, index) => (
                  <span
                    key={index}
                    className={`bg-[#101010] py-0.5 px-2 text-sm rounded-md self-end ${
                      index % 2 === 0 ? "justify-self-start" : "justify-self-end"
                    } min-h-min`}
                  >
                    {msg}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center bg-[#101010] rounded-md pr-2 h-max">
                <Input
                  className="w-full text-sm h-6 bg-[#101010] border-none rounded-md text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <SendHorizonal
                  className="w-4 h-4 cursor-pointer hover:text-gray-300"
                  onClick={(e) => {
                    const inputElement = e.currentTarget.previousElementSibling as HTMLInputElement | null;
                    if (inputElement) {
                      handleSendMessage(inputElement.value);
                      inputElement.value = "";
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-[#101010] w-64 h-full text-white">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <span className="font-semibold text-lg">Amigos</span>
        <div className="flex space-x-2">
          <UserPlus className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {friendMessages.map((friend, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={friend.avatarUrl}
              alt={friend.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <span className="text-sm font-medium">{friend.name}</span>
            </div>
            <MessageSquare
              className="w-5 h-5 cursor-pointer hover:text-gray-300"
              onClick={() => {
                setIsMessageCardOpen(true);
                setSelectedFriend(friend.name);
              }}
            />
            <Lock className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          </div>
        ))}
      </div>
      <MessageCard />
    </div>
  );
};

export default FriendList;
