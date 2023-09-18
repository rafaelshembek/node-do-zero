import { randomUUID } from "node:crypto"
import { sql } from "./sql.js"

export class DatabasePostgres {

 async list(search = '') {

        let videos

        if (search) {
            videos = await sql`select * from  video where title ilike ${'%' + search + '%'}`
        }else{
            videos = await sql`select * from video`
        }

        return videos
    }

   async create(videos) {
        const videoid = randomUUID()
        const {title, description, duration} = videos

        await sql`insert into video (id, title, description, duration) VALUES (${videoid}, ${title}, ${description}, ${duration})`
    }
   async update(id, videos) {
        const { title, description, duration } = videos
        await sql`update video set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }
    delete(id) {

    }
}