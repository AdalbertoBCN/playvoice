import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../../env";

export const generateTokenRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/chat-token", async (req) => {
        const { AccessToken } = await import("livekit-server-sdk");

        const createToken = async () => {
            // If this room doesn't exist, it'll be automatically created when the first
            // client joins
            const roomName = 'quickstart-room';
            // Identifier to be used for participant.
            // It's available as LocalParticipant.identity with livekit-client SDK
            const participantName = `participant-${Math.random().toString(36).substring(7)}`;
          
            const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
              identity: participantName,
              // Token to expire after 10 minutes
              ttl: '10m',
            });
            at.addGrant({ roomJoin: true, room: roomName });
          
            return await at.toJwt();
          };
        return { token: await createToken() };
    })
};