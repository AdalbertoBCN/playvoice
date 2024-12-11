import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';
import { StatusCodes } from 'http-status-codes';

export const createGamesRoutes: FastifyPluginAsyncZod = async function (app) {
  app.post("/games", {
    schema: {
      body: z.object({
        name: z.string(),
      }),
      response: {
        201: z.object({
          message: z.string(),
          id: z.string(),
        }),
        500: z.object({
          message: z.string(),
        }),
      },
      tags: ["Games"],
      summary: 'Adicionar um jogo',
      description: 'Esta rota adiciona um jogo.',
    }
  }, async (req, reply) => {
    const { name } = req.body;

    try {
      const createdGame = await prisma.games.create({
        data: { name },
      });

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Jogo criado com sucesso!", id: createdGame.id });
    } catch (error) {
      return reply
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Erro ao criar o jogo. Por favor, tente novamente." });
    }
  });
};
