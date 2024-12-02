import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import z from 'zod';

export const sendMessageRoute: FastifyPluginAsyncZod = async function (app) {
    app.put("/message", {
        schema: {
            body: z.object({
                user1Id: z.string(),
                user2Id: z.string(),
                content: z.string()

            })
        }
    }, async (req) => {
        const { content, user1Id, user2Id } = req.body

        const chat = await prisma.chat.findFirst({
            where: {
                OR: [
                    {
                        user1Id,
                        user2Id
                    },
                    {
                        user1Id: user2Id,
                        user2Id: user1Id
                    }
                ]
            }
        });

        if (!chat) {
            await prisma.chat.create({
                data: {
                    user1Id,
                    user2Id
                }
            });
        }

        await prisma.chat.updateMany({
            where: {
                OR: [
                    {
                        user1Id,
                        user2Id
                    },
                    {
                        user1Id: user2Id,
                        user2Id: user1Id
                    }
                ]
            },
            data: {
                messages: {
                    push: {
                        id: Math.random().toString(36).substring(7),
                        content,
                        senderId: user1Id
                    }
                }
            }
        })
    })
};