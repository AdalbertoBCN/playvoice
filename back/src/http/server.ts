import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

const app = fastify();

const createUserSchema = z.object({
  name: z.string(),
});

app.get("/users", async (req, res) => {

  const users = await prisma.users.findMany();

  return res.status(200).send(users);
});

app.post("/users", async (req, res) => {
  const user = createUserSchema.parse(req.body);
    console.log(user)

  const createdUser = await prisma.users.create({
    data: {
        name: user.name,
    },
  });
  
  console.log(createdUser)

  return res.status(200).send({
    id: createdUser.id,
  });
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
