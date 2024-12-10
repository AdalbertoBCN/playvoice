import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from '../../../../prisma/prisma';
import path from 'path';
import fs from "fs";
import { uploadDir } from '../../server';
import { pipeline } from 'node:stream/promises';
import fastifyMultipart from '@fastify/multipart';

export const uploadImagesRoutes: FastifyPluginAsyncZod = async function (app) {
    // Register multipart support if not already done globally

    app.post("/uploads", {
        schema: {
            tags:["Imagem"],
            summary: 'Adicionar uma imagem',
            description: 'Esta rota realiza o upload de uma imagem.',
        }
    }, async (req, reply) => {
        try {
           
            const {image:data} = req.body as any;  // Fastify-multipart for handling file uploads
            const file = data.toBuffer()
            if (!data) {
                return reply.status(400).send({ error: "No file uploaded" });
            }
            
            const filename = data.filename;  // Get the file name from the uploaded file
            const filePath = path.join(uploadDir, filename);  // Define the destination file path

            // Ensure the uploads directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Stream the uploaded file to disk
            await pipeline(file, fs.createWriteStream(filePath));

            // Return a success response
            reply.status(200).send({ message: "File uploaded successfully", filename });
        } catch (error) {
            // Handle any errors
            console.error(error);
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });
};