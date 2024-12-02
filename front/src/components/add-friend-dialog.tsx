import React, { useState, useMemo } from 'react'
import { UserPlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Friend } from '@/types/Friend'

interface AddFriendDialogProps {
  userId: string;
  userFriends: Friend[];
  onAddFriend: (friend: Friend, userId: string) => void;
}

export const AddFriendDialog: React.FC<AddFriendDialogProps> = ({
  userId,
  userFriends,
  onAddFriend,
}) => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([])

  useMemo(() => {
    const fetchFriends = async () => {
      const { users } = await fetch(
        `http://localhost:3333/users/${searchQuery}`
      ).then((res) => res.json())
      const otherUsers = users.filter((user: { id: string }) => {
        return user.id !== userId && !userFriends.some((friend) => friend.id === user.id)
      })
      setFilteredFriends(otherUsers)
    }
    if (searchQuery) {
      fetchFriends()
    } else {
      setFilteredFriends([])
    }
  }, [searchQuery, userId, userFriends])

  return (
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
                key={friend.id}
                className="cursor-pointer px-4 py-2 hover:bg-zinc-800"
                onClick={() => {
                  onAddFriend(friend, userId)
                  setOpen(false)
                }}
              >
                {friend.name}
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
