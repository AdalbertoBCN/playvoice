import fastify from "fastify"
import { z } from "zod"

const app = fastify()

app.get("/", (res, req) => {
    return Response.json({
        message: "Deu certo!"
    })
})

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running!");
})