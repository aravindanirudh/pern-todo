# PERN Todo List Website
- Source video: [PERN Stack Course - Postgres, Express, React, and Node](https://youtu.be/ldYcgPKEZC8).
- Comments in detail (so that even a beginner can easily understand) are given alongisde each line of code in various project files.
- This readme.md file contains the notes made during learning.

> [!NOTE]
> This repository contains `.env` file purposefully committed in `frontend` directory. Generally, it is a terrible idea to commit `.env` files. In this case, it is safe as it contains only the `VITE_BASE_URL`.

### Project Initialization
- Install NodeJS, PostgreSQL from official website. For PostgreSQL installation tutorial, see [this video](https://www.youtube.com/watch?v=fZQI7nBu32M).
- Create backend and frontend folder.
- In backend folder, run `npm i express cors pg`
- `cors` or Cross-Origin Resource Sharing is a browser security mechanism that restricts web pages from requesting resources from a different domain than the one that served the original page.
- `pg` enables your Node.js application to connect, query, and interact with a PostgreSQL database.

### Notes
- `psql -U postgres` in cmd for connecting to PostgreSQL.
- `\l` - list all databases.
- `\c <database_name>` - move inside a database.
- `\dt` - show list of tables in database.
- `CREATE DATABASE perntodo` - create a database called 'perntodo'.
- `CREATE TABLE todo(...)` - create a table called 'todo'.
- Use `"type": "module",` in package.json to use ES Modules like `import { Pool } from "pg";` instead of `const Pool = require("pg").Pool;`.

### The public Directory in React Vite
- Everything inside public is copied directly to the build output without processing.
- If you have assets that:
    - Are never referenced in source code (e.g. robots.txt, favicon.ico, sitemap.xml, manifest.webmanifest (if you want users to be able to "install" your site to their home screen or if you want to control mobile browser branding)).
    - Must retain the exact same file name (without hashing).
    - You simply don't want to have to import an asset first just to get its URL.
- Then you can place the asset in a special public directory under your project root. Assets in this directory will be served at root path / during dev, and copied to the root of the dist directory as-is.
- The directory defaults to <root>/public, but can be configured via the publicDir option.
- Note that you should always reference public assets using root absolute path - for example, public/icon.png should be referenced in source code as /icon.png.

### Todos
- Make clear notes for each new thing
- Why no CSS import required in each jsx file