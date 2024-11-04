import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import z from 'zod';

export const getUserRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/user/:id",{
        schema:{
            params:z.object({
                id:z.string()
            })

        }
    }, async (req) => {
        const {id} = req.params
        const user = await prisma.users.findUnique({
            where: {
                id

            }
        });

        return {
            user
        }
    })
};