import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';

export const createUserRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/users/:id", {
        schema: {
            body: z.object({
                name: z.string(),
                image: z.string().optional(),
            }),
            params: z.object({
                id: z.string()
            }),
            response: {
                200: z.object({
                   user: z.object({
                          id: z.string(),
                          name: z.string(),
                          image: z.string().optional(),
                          friends: z.array(z.object({
                                id: z.string(),
                                name: z.string(),
                                image: z.string().optional()
                          })),
                          games: z.array(z.object({
                                id: z.string(),
                                name: z.string(),
                          }))
                   })
                })
            }
        }
    }, async (req, res) => {
        const { name, image } = req.body
        const { id } = req.params;

        console.log(id)

        const user = await prisma.users.create({
            data: {
                id,
                name,
                image
            },
        });

        const friends = await prisma.users.findMany({
            where: {
                id: {
                    in: user.friends
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

        return res.status(200).send({
            user:{
                id:user.id,
                name:user.name,
                image:user.image ?? "",
                friends: friends,
                games
            }
        })
    })
};