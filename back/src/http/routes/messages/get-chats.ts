import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import z from 'zod';

export const getChatsRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/message/:id", {
        schema: {
            params: z.object({
                id: z.string(),
            })
        }
    }, async (req) => {
        const { id } = req.params

        const userChats = await prisma.chat.findMany({
            where: {
              OR: [
                { user1Id: id },
                { user2Id: id }
              ]
            }
          });
        
        return {
            chats:userChats
        }
    })
};