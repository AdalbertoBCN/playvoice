import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import z from 'zod';

export const getChatsRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/message/:id", {
        schema: {
            params: z.object({
                id: z.string(),
            }),
            tags:["Chat"],
            summary: 'Buscar chat entre usuários',
            description: 'Esta rota busca um chat',
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