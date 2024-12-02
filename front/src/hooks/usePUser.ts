import { create } from 'zustand';

interface PUser {
    user: {
        id: string;
        name: string;
        image: string;
        description: string;
        friends: {
            id: string;
            name: string;
            image: string;
        }[];
        games: {
            id: string;
            name: string;
        }[]
    }
    setUser: (userId: string, image: string, name: string) => void;
    addFriend: (friendId: {
        id: string;
        name: string;
        image: string
    }, id: string) => void;
    blockFriend: (id:string, friendId: string) => void;
    updateUser: (user: Partial<PUser["user"]>) => void;
}

export const usePUser = create<PUser>((set) => ({
    user: {
        id: "",
        name: "",
        image: "",
        description: "",
        friends: [],
        games: []
    },
    setUser: (userId, image, name) => {

        if(!userId) return;

        (async () => {

            try {
                const response = await fetch("http://localhost:3333/user/".concat(String(userId)));
                const res = await response.json();

                if (response.status === 404) {
                    // Create user logic here
                    const pUser = await fetch("http://localhost:3333/users/".concat(String(userId)), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ name, image })
                    }).then(res => res.json());

                    set({ user: pUser.user });
                }

                set({ user: res.user });

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        })();
    },
    addFriend: async (friend, id) => {

        const response = await fetch("http://localhost:3333/add-friend", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                friendId: friend.id
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to add friend");
        }

        set((state) => ({
            user: {
                ...state.user,
                friends: [
                    ...state.user.friends,
                    friend
                ]
            }
        }))

    },
    blockFriend: async (id:string, friendId: string) => {
        await fetch("http://localhost:3333/block-friend", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                friendId
            })
        })
    },
    updateUser: async (user: Partial<PUser["user"]>) => {
        // put /users
        await fetch("http://localhost:3333/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...user,
            })
        });

        set((state) => ({
            user: {
                ...state.user,
                ...user
            }
        }));
    }
}));