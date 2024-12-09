import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';

export const createGamesRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/games", {
        schema: {
            body: z.object({
                name: z.string(),
            }),
            tags:["Games"],
            summary: 'Adicionar um jogo',
            description: 'Esta rota adiciona um jogo.',
        }
    }, async (req) => {
        const { name } = req.body

        await prisma.games.create({
            data: {
                name
            }
        });
    })
};