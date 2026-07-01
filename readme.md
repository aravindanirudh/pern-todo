# PERN Todo List Website
- Source video: [PERN Stack Course - Postgres, Express, React, and Node](https://youtu.be/ldYcgPKEZC8).
- Comments in detail (so that even a beginner can easily understand) are given alongisde each line of code in various project files.
- This readme.md file contains the notes made during learning.

### Project Initialization
- Install NodeJS, PostgreSQL from official website. For PostgreSQL installation tutorial, see [this video](https://www.youtube.com/watch?v=fZQI7nBu32M).
- Create backend and frontend folder.
- In backend folder, run `npm i express cors pg`
- `cors` or Cross-Origin Resource Sharing is a browser security mechanism that restricts web pages from requesting resources from a different domain than the one that served the original page.
- `pg` enables your Node.js application to connect, query, and interact with a PostgreSQL database.

### Notes
- `\l` - list all databases.
- `\c` - move inside a database.
- `\dt` - show table in database.
- `CREATE DATABASE perntodo` - create a database called 'perntodo'.
- `CREATE TABLE todo(...)` - create a table called 'todo'.
- https://youtu.be/ldYcgPKEZC8?t=504