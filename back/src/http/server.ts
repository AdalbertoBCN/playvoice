import fastify from "fastify";
import { z } from "zod";
import {PrismaClient } from "@prisma/client";

const app = fastify()

const prisma =  new PrismaClient ({
    log: ['query'],
})

app.get("/", async  (res, request) => {
    const createEventSchema = z.object({
            id: z.string(),
            nome: z.string(),
    })

    const  data = createEventSchema.parse(request.body)

const usuarios = await prisma.usuarios.create({
        data:{
            id: data.id,
            nome: data.nome,
        }
    })

    return {usuariosId: usuarios.id}

})

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running!");
})