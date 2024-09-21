import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';

export const deleteUserRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/users", {
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
            data: {
                status: false,
            }
        });
    })
};