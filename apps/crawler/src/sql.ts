import postgres from "postgres";

const sql = postgres({ transform: postgres.camel }); // will use psql environment variables

export default sql;
