import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';

export const updateGamesRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/games", {
        schema: {
            body: z.object({
                id: z.string(),
                name: z.string().optional(),
                
            }),
        }
    }, async (req) => {
        const { id, name} = req.body

        await prisma.games.update({
            where: {
                id
            },
            data: {
                name,
        
            }
        });
    })
};