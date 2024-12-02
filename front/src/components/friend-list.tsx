import React, { useEffect } from 'react'
import { Lock, MessageSquare, Search } from 'lucide-react'
import { Button } from './ui/button'
import { AddFriendDialog } from './add-friend-dialog'
import { MessageCard } from './message-card'
import { usePUser } from '@/hooks/usePUser'
import { useChats } from '@/hooks/useChats'
import { u } from '@tauri-apps/api/path-f8d71c21'

const FriendList: React.FC = () => {
  const user = usePUser()
  const { chats, addMessage, setChats } = useChats()
  const [isMessageCardOpen, setIsMessageCardOpen] = React.useState(false)
  const [selectedFriend, setSelectedFriend] = React.useState<string>(
    user.user.friends[0]?.id
  )

  const fetchChats = async () => {
    await setChats(selectedFriend)
  }

  useEffect(() => {
    fetchChats()
    const interval = setInterval(() => {
      setChats(selectedFriend)
      user.setUser(user.user.id, user.user.image, user.user.name)
    }, 1000)
    return () => clearInterval(interval)
  }, [selectedFriend])

  const handleSendMessage = async (newMessage: string) => {
    if (!selectedFriend) return
    await addMessage(newMessage, selectedFriend, user.user.id)
    await fetchChats()
  }

  const currentChat = chats.find(
    (chat) => chat.user1Id === selectedFriend || chat.user2Id === selectedFriend
  )

  return (
    <div className="h-full w-64 bg-[#101010] text-white">
      <div className="flex items-center gap-2 border-b border-gray-700 p-2">
        <span className="text-lg font-semibold">Amigos</span>
        <div className="flex gap-2">
          <AddFriendDialog
            userId={user.user.id}
            userFriends={user.user.friends}
            onAddFriend={user.addFriend}
          />
          <Button variant="ghost">
            <Search className="h-5 w-5 cursor-pointer hover:text-gray-300" />
          </Button>
        </div>
      </div>
      <div className="space-y-4 p-4">
        {user.user.friends.map((friend) => (
          <div key={friend.id} className="flex items-center space-x-3">
            <img
              src={friend.image ?? "/avatars/01.png"}
              alt={friend.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <span title={friend.name} className="text-sm font-medium max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis block">{friend.name}</span>
            </div>
            <MessageSquare
              className="h-5 w-5 cursor-pointer hover:text-gray-300"
              onClick={() => {
                setIsMessageCardOpen(true)
                setSelectedFriend(friend.id)
              }}
            />
            <Lock onClick={() => {
              user.blockFriend(user.user.id, friend.id);
              user.blockFriend(friend.id, user.user.id);
            }} className="h-5 w-5 cursor-pointer hover:text-gray-300" />
          </div>
        ))}
      </div>
      <MessageCard
        isOpen={isMessageCardOpen}
        onClose={() => setIsMessageCardOpen(false)}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
        friends={user.user.friends}
        currentChat={currentChat}
        onSendMessage={handleSendMessage}
        userId={user.user.id}
      />
    </div>
  )
}

export default FriendList