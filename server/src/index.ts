import "reflect-metadata";
import "dotenv-safe/config";

import cors from "cors";
import Redis from "ioredis";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
// import { createConnection } from "typeorm";

import { ApolloServer } from "apollo-server-express";
import { StockResolver } from "./resolvers/stock";

import { COOKIE_NAME, __prod__ } from "./constants";
import { buildSchema } from "type-graphql";

// import { Stock } from "./entities/Stock";

// import path from "path";

const main = async () => {
  //   await createConnection({
  //     type: "postgres",
  //     database: "pet-detectivev1",
  //     username: "postgres",
  //     password: "postgres",
  //     url: process.env.DATABASE_URL,
  //     // logging: true,
  //     synchronize: true,
  //     // migrations: [path.join(__dirname, "./migrations/*")],
  //     entities: [Stock],
  //   });

  //   await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [StockResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:3000");
  });
};

main().catch((err) => {
  console.log(err);
});
