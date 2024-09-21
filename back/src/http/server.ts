import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { createUserRoutes } from "./routes/user/create-user";
import { getUserRoute } from "./routes/user/get-user";
import { updateUserRoutes } from "./routes/user/update-user";
import { deleteUserRoutes } from "./routes/user/delete-user";

import { createGamesRoutes } from "./routes/games/create-games";
import { getGamesRoute } from "./routes/games/get-games";
import { deleteGamesRoutes } from "./routes/games/delete-games";
import { updateGamesRoutes } from "./routes/games/update-games";
import { createUserGamesRoutes } from "./routes/user/create-user-games";


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createUserGamesRoutes);
app.register(createUserRoutes);
app.register(getUserRoute);
app.register(updateUserRoutes);
app.register(deleteUserRoutes);

app.register(createGamesRoutes);
app.register(getGamesRoute);
app.register(deleteGamesRoutes);
app.register(updateGamesRoutes);




app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
