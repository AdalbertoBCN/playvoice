export interface Friend {
    id: string;
    name: string;
    image: string;
  }

export interface Chat {
    id: string;
    user1Id: string;
    user2Id: string;
    messages: {
        id: string;
        content: string;
        senderId: string;
        createdAt: string;
    }[];
}