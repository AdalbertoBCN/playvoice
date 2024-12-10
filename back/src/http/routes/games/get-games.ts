import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';

export const getGamesRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/games", async () => {

        const games = await prisma.games.findMany();

        return {
            games
        }
        
    })
    
};