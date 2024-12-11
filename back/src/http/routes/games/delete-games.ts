import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../../../prisma/prisma';
import { StatusCodes } from 'http-status-codes';

export const deleteGamesRoutes: FastifyPluginAsyncZod = async function (app) {
  app.delete("/games", {
    schema: {
      body: z.object({
        id: z.string(),
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
      summary: 'Deletar um jogo',
      description: 'Esta rota remove um jogo de forma lógica, alterando seu status para false.',
    },
  }, async (req, reply) => {
    const { id } = req.body;

    try {
      const updatedGame = await prisma.games.update({
        where: { id },
        data: { status: false },
      });

      if (!updatedGame) {
        return reply
          .status(StatusCodes.NOT_FOUND)
          .send({ message: "Jogo não encontrado." });
      }

      return reply
        .status(StatusCodes.OK)
        .send({ message: "Jogo deletado com sucesso!" });
    } catch (error: any) {
      if (error.code === 'P2025') { // Código do Prisma para registro não encontrado
        return reply
          .status(StatusCodes.NOT_FOUND)
          .send({ message: "Jogo não encontrado." });
      }
      throw error;
    }
  });
};
