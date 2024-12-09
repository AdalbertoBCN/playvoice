import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import z from 'zod';

export const getUserRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/user/:id",{
        schema:{
            params:z.object({
                id:z.string()
            }),
            tags:["Usuário"],
            summary: 'Busca um usuário',
            description: 'Esta rota busca um usuário.',
        }
    }, async (req, res) => {
        const {id} = req.params
        const user = await prisma.users.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }

        const friends = await prisma.users.findMany({
            where: {
                id: {
                    in: user.friends,
                    notIn: user.blockedUsers
                }
            },
            select:{
                id:true,
                name:true,
                image:true
            }
        }).then(friends => friends.map(friend => ({
            ...friend,
            image: friend.image ?? ""
        })));

        const games = await prisma.games.findMany({
            where: {
                id:  {
                    in: user.games.map(game => game.gameId)
                }
            },
            select:{
                id:true,
                name:true
            }
        })

        return {
            user: {
                ...user,
                image: user.image ?? "",
                friends: friends ?? [],
                games
            }
        }
    })
};