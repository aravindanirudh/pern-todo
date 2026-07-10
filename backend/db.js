// This file sets up the database connection pool. Using a connection pool is a standard practice because it efficiently manages multiple connections to the database, rather than opening and closing a new connection for every single query.
import { Pool } from "pg";

// We create a new instance of the  Pool  class and assign it to the  pool  constant. We pass in a configuration object.
const pool = new Pool({
  user: "postgres", // The username for the PostgreSQL database. In this case, it's set to "postgres", which is the default superuser for PostgreSQL.
  password: "200520052005", // The password for the PostgreSQL user. This should be kept secure and not hardcoded in production applications.
  host: "localhost", // The hostname of the database server. "localhost" indicates that the database is running on the same machine as the application.
  port: 5432, // The port number on which the PostgreSQL server is listening. The default port for PostgreSQL is 5432.
  database: "perntodo", // The name of the specific database to connect to. In this case, it's "perntodo", which is presumably the database used for the todo application.
});

export default pool;