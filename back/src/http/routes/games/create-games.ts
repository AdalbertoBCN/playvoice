import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';

export const createGamesRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/games", {
        schema: {
            body: z.object({
                name: z.string(),
            }),
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