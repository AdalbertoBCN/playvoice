import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';

export const deleteGamesRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/games", {
        schema: {
            body: z.object({
                id: z.string()
            }),
        }
    }, async (req) => {
        const { id } = req.body

        await prisma.users.update({
            where: {
                id
            },
            data:
            {
                status:false
            }
        });
    })
};