import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';

export const getUserRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/users", async () => {
        const users = await prisma.users.findMany();

        return {
            users
        }
    })
};