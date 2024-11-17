import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';

export const updateUserRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/users", {
        schema: {
            body: z.object({
                id: z.string(),
                name: z.string().optional(),
                description: z.string().optional(),    
            }),
        }
    }, async (req) => {
        const { id, name,description} = req.body

        console.log(description, id)

        await prisma.users.update({
            where: {
                id
            },
            data: {
                name,
                description,
            }
        });
    })
};