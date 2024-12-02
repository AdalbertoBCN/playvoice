import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';

export const addFriendRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/add-friend", {
        schema: {
            body: z.object({
                id: z.string(),
                friendId: z.string(),
            }),
        }
    }, async (req) => {
        const { id, friendId } = req.body;

        const user = await prisma.users.findUnique({
            where:{
                id
            }
        })

        if (!user) throw new Error("usuario não encontrado")
            
        if (user.friends.includes(friendId)) throw new Error("você já é amigo deste usuário")
            
        if (user.blockedUsers.includes(friendId)) throw new Error("você bloqueou este usuário")
    
        await prisma.users.update({
            where: {
                id
            },
            data: {
                friends:{
                    push:friendId

                }
            }
        });

        await prisma.users.update({
            where: {
                id: friendId
            },
            data: {
                friends:{
                    push:id

                }
            }
        });
    })
};