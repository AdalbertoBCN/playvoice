import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import { StatusCodes } from 'http-status-codes';

export const updateGamesRoutes: FastifyPluginAsyncZod = async function (app) {
  app.put("/games", {
    schema: {
      body: z.object({
        id: z.string(),
        name: z.string().optional(),
      }),
      response: {
        200: z.object({
          message: z.string(),
        }),
        404: z.object({
          message: z.string(),
        }),
      },
      tags: ["Games"],
      summary: 'Atualizar um jogo',
      description: 'Esta rota atualiza um jogo.',
    },
  }, async (req, reply) => {
    const { id, name } = req.body;

    try {
      const updatedGame = await prisma.games.update({
        where: { id },
        data: { name },
      });

      if (!updatedGame) {
        return reply.status(StatusCodes.NOT_FOUND).send({ message: "Jogo não encontrado." });
      }

      return {
        message: "Jogo atualizado com sucesso!",
      };
    } catch (error:any) {
      if (error.code === 'P2025') { // Código do Prisma para registro não encontrado
        return reply.status(StatusCodes.NOT_FOUND).send({ message: "Jogo não encontrado." });
      }
      throw error;
    }
  });
};
