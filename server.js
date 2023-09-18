// import { createServer } from "node:http";
import Calc from "./teste.js";

import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();



server.post('/video', async (request, reply) => {

    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/video', async (request) => {

    const search = request.query.search

    console.log(search)

    const videos = await database.list(search);
    
    console.log(videos);
    
    return videos
})
server.put('/video/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body;
    await database.update(videoId, {
        title, 
        description, 
        duration 
    })

    return reply.status(204).send()

})
server.delete('/video/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
    
})
server.get('/names', () => {
    return Calc(5,5)
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})