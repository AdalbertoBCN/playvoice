import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifyMultipart from "@fastify/multipart";
import path from "path";
import fs from "fs";

import { createUserRoutes } from "./routes/user/create-user";
import { getUserRoute } from "./routes/user/get-user";
import { updateUserRoutes } from "./routes/user/update-user";
import { deleteUserRoutes } from "./routes/user/delete-user";

import { createGamesRoutes } from "./routes/games/create-games";
import { getGamesRoute } from "./routes/games/get-games";
import { deleteGamesRoutes } from "./routes/games/delete-games";
import { updateGamesRoutes } from "./routes/games/update-games";
import { createUserGamesRoutes } from "./routes/user/create-user-games";
import { uploadImagesRoutes } from "./routes/images/upload-image";
import { generateTokenRoutes } from "./voice-chat/generate-token";

import cors from "@fastify/cors"

export const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyMultipart,{
  attachFieldsToBody: true
});

app.register(cors, {
  origin: "*", 
});

app.register(createUserGamesRoutes);
app.register(createUserRoutes);
app.register(getUserRoute);
app.register(updateUserRoutes);
app.register(deleteUserRoutes);

app.register(createGamesRoutes);
app.register(getGamesRoute);
app.register(deleteGamesRoutes);
app.register(updateGamesRoutes);

app.register(uploadImagesRoutes);

app.register(generateTokenRoutes);

app.register(require('@fastify/static'), {
  root: uploadDir,
  prefix: '/uploads/', 
})


app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
