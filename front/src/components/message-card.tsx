import React from 'react'
import { X, SendHorizonal } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Friend, Chat } from '@/types/Friend'

interface MessageCardProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFriend: string;
  onSelectFriend: (friendId: string) => void;
  friends: Friend[];
  currentChat: Chat | undefined;
  onSendMessage: (message: string) => void;
  userId: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  isOpen,
  onClose,
  selectedFriend,
  onSelectFriend,
  friends,
  currentChat,
  onSendMessage,
  userId,
}) => {
  const [inputValue, setInputValue] = React.useState("")

  if (!isOpen) return null

  const handleSend = (message: string) => {
    if (!message.trim()) return
    onSendMessage(message)
    setInputValue("")
  }

  return (
    <Card className="absolute bottom-0 right-64 flex h-80 w-96 flex-col border-none">
      <CardHeader className="flex-row items-center space-x-1 space-y-0 rounded-md bg-[#101010] p-0">
        <X
          className="h-4 w-4 cursor-pointer hover:text-gray-300"
          onClick={onClose}
        />
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="flex h-full w-full items-start bg-[#242424] pt-6">
          <ToggleGroup
            type="single"
            value={selectedFriend}
            className="flex h-full w-max flex-col justify-start border-r border-white/20 px-1"
          >
            {friends.map((friend) => (
              <ToggleGroupItem
                className="h-max w-full py-0.5 data-[state=on]:bg-[#101010] hover:bg-[#101010] hover:text-white hover:opacity-80"
                key={friend.id}
                value={friend.id}
                onClick={() => onSelectFriend(friend.id)}
              >
                <span 
                  title={friend.name} 
                  className="w-full text-start whitespace-nowrap max-w-[100px] text-ellipsis overflow-hidden"
                >
                  {friend.name}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="flex h-full w-full flex-col justify-end gap-y-2 px-2 py-3">
            <div className="grid w-full grid-flow-row gap-y-1">
              {currentChat?.messages.map((msg, index) => (
                <span
                  key={index}
                  className={`self-end rounded-md bg-[#101010] px-2 py-0.5 text-sm ${
                    msg.senderId === userId
                      ? "justify-self-end"
                      : "justify-self-start"
                  } min-h-min`}
                >
                  {msg.content}
                </span>
              ))}
            </div>
            <div className="flex h-max items-center justify-between rounded-md bg-[#101010] pr-2">
              <Input
                className="h-6 w-full rounded-md border-none bg-[#101010] text-sm text-white"
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend(inputValue)
                  }
                }}
              />
              <SendHorizonal
                className="h-4 w-4 cursor-pointer hover:text-gray-300"
                onClick={() => handleSend(inputValue)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}