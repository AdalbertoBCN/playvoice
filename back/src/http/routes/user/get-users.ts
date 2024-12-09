import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import z from 'zod';

export const getUsersRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/users/:name",{
        schema:{
            params:z.object({
                name:z.string().optional()
            }),
            tags:["Usuário"],
            summary: 'Busca um usuário',
            description: 'Esta rota busca varios usuários.',
        }
    }, async (req, res) => {
        const { name } = req.params
        
        const users = await prisma.users.findMany({
            where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
            }
        });

        if (users.length === 0) {
            return res.status(404).send({
                message: "No users found"
            })
        }

        const formattedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            image: user.image ?? ""
        }))

        return {
            users:formattedUsers
        }
    })
};