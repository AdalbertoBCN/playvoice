import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';

export const createUserRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/users", {
        schema: {
            body: z.object({
                name: z.string(),
            }),
        }
    }, async (req) => {
        const { name } = req.body

        await prisma.users.create({
            data: {
                name
            }
        });
    })
};