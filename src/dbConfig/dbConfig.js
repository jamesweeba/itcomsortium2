module.exports = {
    postgresdb: {
      local: {
        host: process.env.PG_HOST ||"localhost"  ||"pg-dev.esoko.com",
        user: process.env.PG_USER  ||"postgres" ||"insyt",
        password: process.env.PG_PASSWD ||"postgres"|| "thisdoesnotmatter",
        database: process.env.PG_DBNAME   ||"postgres"|| "insyt_dev"||"insyt_dev" || "insyt",
        port: process.env.PG_PORT || 5432,
        connectionTimeoutMillis: process.env.PG_CONNECT_TIMEOUT || 25000,
        idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT || 10000,
        max: process.env.PG_MAX_POOL || 400
      } 
  
    }
  }

  //DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
