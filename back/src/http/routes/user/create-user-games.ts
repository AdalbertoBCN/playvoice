import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';
import { error } from 'console';

export const createUserGamesRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/game-user", {
        schema: {
            body: z.object({
                userId: z.string(),
                gameId: z.string(),
                gameUserId: z.string()
            }),
            tags:["Usuário"],
            summary: 'Adicionar jogo ao perfil de um usuário',
            description: 'Esta rota adiciona um jogo.',
        }
    }, async (req) => {
        const { userId, gameId, gameUserId } = req.body

        const game = await prisma.games.findUnique({
            where: {
                id: gameId
            }
        })
        if (!game) throw new Error("jogo não encontrado")

        await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                games: {
                    push: {
                        gameId: game.id,
                        gameUserId
                    }
                }
            }
        });
    })
};