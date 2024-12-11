import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import { StatusCodes } from 'http-status-codes';

export const getGamesRoute: FastifyPluginAsyncZod = async function (app) {
  app.get("/games", {
    schema: {
      response: {
        200: z.object({
          games: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              status: z.boolean().optional(), // Incluído para suportar deleção lógica
            })
          ),
        }),
        500: z.object({
          message: z.string(),
        }),
      },
      tags: ["Games"],
      summary: 'Listar todos os jogos',
      description: 'Esta rota retorna a lista de todos os jogos cadastrados no sistema.',
    },
  }, async (req, reply) => {
    try {
      const games = await prisma.games.findMany();

      return reply.status(StatusCodes.OK).send({
        games,
      });
    } catch (error) {
      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Erro ao buscar jogos. Por favor, tente novamente.",
      });
    }
  });
};
