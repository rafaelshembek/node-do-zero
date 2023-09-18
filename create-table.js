import { sql } from "./sql.js";

// sql`drop table if exists video`.then( () => {
//     console.log('Table apagada')
// } )

sql`
create table video(
    id          text primary key,
    title       text,
    description text,
    duration    integer
);
`.then((result) => {
  console.log(`Table create...`)  
}).catch((err) => {
    console.log(err)
});