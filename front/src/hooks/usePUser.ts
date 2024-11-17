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
    setUser: (userId:string, image:string, name:string) => void;
    addFriend: (friendId: string) => void;
    blockFriend: (friendId: string) => void;
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
        (async () => {
            
            try {
            const response = await fetch("http://localhost:3333/user/".concat(String(userId)));
            const res = await response.json();

            console.log(response.status);

            if (response.status === 404) {
                // Create user logic here
                const pUser = await fetch("http://localhost:3333/users/".concat(String(userId)), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, image })
                }).then(res => res.json());

                set({ user: pUser.user});
            }

            set({ user: res.user });

            } catch (error) {
            console.error("Error fetching user:", error);
            }
        })();
    },
    addFriend: (friendId: string) => {
        // Implementation for adding a friend
    },
    blockFriend: (friendId: string) => {
        // Implementation for blocking a friend
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