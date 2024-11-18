// src/components/FriendList.tsx
import React, { useState } from "react"
import {
  Lock,
  MessageSquare,
  Minus,
  Search,
  SendHorizonal,
  UserPlus,
  X,
} from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

interface Friend {
  name: string
  avatarUrl: string
  messages: string[]
}

const initialFriends: Friend[] = [
  {
    name: "KamiKat",
    avatarUrl: "http://localhost:3333/uploads/teste1.jpg",
    messages: [],
  },
  {
    name: "brTT",
    avatarUrl: "http://localhost:3333/uploads/teste1.jpg",
    messages: [],
  },
  {
    name: "LeoManeiro",
    avatarUrl: "http://localhost:3333/uploads/teste1.jpg",
    messages: [],
  },
]

const FriendList: React.FC = () => {
  const [isMessageCardOpen, setIsMessageCardOpen] = React.useState(false)
  const [selectedFriend, setSelectedFriend] = React.useState<string>(
    initialFriends[0].name
  )
  const [friendMessages, setFriendMessages] =
    React.useState<Friend[]>(initialFriends)

  const handleSendMessage = (newMessage: string) => {
    if (!newMessage.trim()) return

    setFriendMessages((prev) =>
      prev.map((friend) =>
        friend.name === selectedFriend
          ? { ...friend, messages: [...friend.messages, newMessage] }
          : friend
      )
    )
  }

  function MessageCard() {
    if (!isMessageCardOpen) {
      return null
    }

    const currentFriend = friendMessages.find(
      (friend) => friend.name === selectedFriend
    )

    return (
      <Card className="absolute bottom-0 right-64 flex h-80 w-96 flex-col border-none">
        <CardHeader className="flex-row items-center space-x-1 space-y-0 rounded-md bg-[#101010] p-0">
          <X
            className="h-4 w-4 cursor-pointer hover:text-gray-300"
            onClick={() => setIsMessageCardOpen(false)}
          />
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="flex h-full w-full items-start bg-[#242424] pt-6">
            <ToggleGroup
              type="single"
              defaultValue={selectedFriend}
              className="flex h-full w-max flex-col justify-start border-r border-white/20 px-1"
            >
              {friendMessages.map((friend) => (
                <ToggleGroupItem
                  className="h-max w-full py-0.5 data-[state=on]:bg-[#101010] hover:bg-[#101010] hover:text-white hover:opacity-80"
                  key={friend.name}
                  value={friend.name}
                  onClick={() => setSelectedFriend(friend.name)}
                >
                  <span className="w-full text-start">{friend.name}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="flex h-full w-full flex-col justify-end gap-y-2 px-2 py-3">
              <div className="grid w-full grid-flow-row gap-y-1">
                {currentFriend?.messages.map((msg, index) => (
                  <span
                    key={index}
                    className={`self-end rounded-md bg-[#101010] px-2 py-0.5 text-sm ${
                      index % 2 === 0
                        ? "justify-self-start"
                        : "justify-self-end"
                    } min-h-min`}
                  >
                    {msg}
                  </span>
                ))}
              </div>
              <div className="flex h-max items-center justify-between rounded-md bg-[#101010] pr-2">
                <Input
                  className="h-6 w-full rounded-md border-none bg-[#101010] text-sm text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <SendHorizonal
                  className="h-4 w-4 cursor-pointer hover:text-gray-300"
                  onClick={(e) => {
                    const inputElement = e.currentTarget
                      .previousElementSibling as HTMLInputElement | null
                    if (inputElement) {
                      handleSendMessage(inputElement.value)
                      inputElement.value = ""
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const friends = ["4Lan", "paiTT", "Câmeras"]

  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full w-64 bg-[#101010] text-white">
      <div className="flex items-center gap-2 border-b border-gray-700 p-2">
        <span className="text-lg font-semibold">Amigos</span>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <UserPlus className="h-5 w-5 cursor-pointer hover:text-gray-300" />
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900 text-white sm:max-w-[425px]">
              <DialogHeader className="flex flex-row items-center justify-between">
                <DialogTitle>Adicionar Amigo</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <Input
                  placeholder="Pesquisar amigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400"
                />
                <ScrollArea className="h-[200px]">
                  {filteredFriends.map((friend) => (
                    <div
                      key={friend}
                      className="cursor-pointer px-4 py-2 hover:bg-zinc-800"
                    >
                      {friend}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost">
            <Search className="h-5 w-5 cursor-pointer hover:text-gray-300" />
          </Button>
        </div>
      </div>
      <div className="space-y-4 p-4">
        {friendMessages.map((friend, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={friend.avatarUrl}
              alt={friend.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <span className="text-sm font-medium">{friend.name}</span>
            </div>
            <MessageSquare
              className="h-5 w-5 cursor-pointer hover:text-gray-300"
              onClick={() => {
                setIsMessageCardOpen(true)
                setSelectedFriend(friend.name)
              }}
            />
            <Lock className="h-5 w-5 cursor-pointer hover:text-gray-300" />
          </div>
        ))}
      </div>
      <MessageCard />
    </div>
  )
}

export default FriendList
