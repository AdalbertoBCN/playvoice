import TopNavbar from "@/components/top-navbar";
import FriendList from "@/components/friend-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePUser } from "@/hooks/usePUser";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
    const { user, updateUser } = usePUser();
    const [nameDialogOpen, setNameDialogOpen] = useState(false);
    const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [newDescription, setNewDescription] = useState(user.description);

    const handleNameSubmit = () => {
        updateUser({ id:user.id, name: newName });
        setNameDialogOpen(false);
    };

    const handleDescriptionSubmit = () => {
        updateUser({ id:user.id, description: newDescription });
        setDescriptionDialogOpen(false);
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            <TopNavbar />

            <main className="w-full grid grid-cols-[1fr_min-content] flex-1">
                <div className="relative p-4">
                    <div className="relative p-4">
                        <div className="rounded-xl bg-profile bg-cover bg-[0_-80px] p-4 flex items-center gap-x-4">
                            <Avatar className="relative w-24 h-24">
                                <AvatarImage
                                    src={user.image}
                                    alt="profile"
                                />
                            </Avatar>

                            <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent">
                                        <h2 className="text-2xl font-bold">
                                            {user?.name?.split(" ").slice(0, 2).join(" ")}
                                        </h2>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edite seu nome</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            defaultValue={user.name}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Digite seu nome..."
                                        />
                                        <Button onClick={handleNameSubmit}>Salvar</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="mt-4">
                            <span className="block text-2xl font-bold">
                                Descrição
                            </span>
                            <Dialog open={descriptionDialogOpen} onOpenChange={setDescriptionDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full text-left hover:bg-transparent p-0"
                                    >
                                        <div className="flex items-start w-full gap-2">
                                            <span className={cn("block text-2xl mt-4 text-justify", {
                                                "opacity-50": !user.description,
                                            })}>
                                                {user.description ?? "Adicione uma descrição..."}
                                            </span>
                                            <Pencil className="w-4 h-4 mt-6" />
                                        </div>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edite sua Descrição</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-4">
                                        <Textarea
                                            defaultValue={user.description}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                            placeholder="adicionar descrição..."
                                            className="min-h-[100px]"
                                        />
                                        <Button onClick={handleDescriptionSubmit}>Salvar</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="mt-4 flex flex-col gap-y-4">
                            <span className="text-xl font-semibold">
                                Ultimos Jogos jogados
                            </span>
                            <div>
                                <img src="/games/LOL.png" alt="League of Legends" className="w-20 h-20" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-self-end">
                    <FriendList />
                </div>
            </main>
        </div>
    );
}