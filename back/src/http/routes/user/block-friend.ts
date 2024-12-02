import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';

export const blockFriendRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/block-friend", {
        schema: {
            body: z.object({
                id: z.string(),
                friendId: z.string(),
            }),
        }
    }, async (req) => {
        const { id, friendId } = req.body

        const user = await prisma.users.findUnique({
            where:{
                id
            }
        })

        if (!user) throw new Error("usuário não encontrado")
            
        if (user.blockedUsers.includes(friendId)) throw new Error("você já bloqueou este usuário")
    
        await prisma.users.update({
            where: {
                id
            },
            data: {
                blockedUsers:{
                    push:friendId
                }
            }
        });
    })
};