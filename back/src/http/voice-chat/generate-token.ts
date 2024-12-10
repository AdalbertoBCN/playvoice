import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../../env";
import z from "zod";

export const generateTokenRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/chat-token",{
      schema:{
        body: z.object({
          roomName: z.string(),
          participantName: z.string()
        })
      }
    }, async (req) => {

        const { roomName, participantName } = req.body;

        const { AccessToken } = await import("livekit-server-sdk");

        const createToken = async () => {
          
            const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
              identity: participantName,
              // Token to expire after 10 minutes
              ttl: '60m',
            });

            at.addGrant({ roomJoin: true, room: roomName });
          
            return await at.toJwt();

          };
          
        return { token: await createToken() };
    })
};