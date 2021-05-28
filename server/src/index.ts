import "reflect-metadata";
import "dotenv-safe/config";

import Redis from "ioredis";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";

import { ApolloServer } from "apollo-server-express";

import { COOKIE_NAME, __prod__ } from "./constants";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "./resolvers/hello";
import { AnimalResolver } from "./resolvers/stock";
import { UserResolver } from "./resolvers/user";

import { User } from "./entities/User";
import { Animal } from "./entities/Animal";
import { LocatedAt } from "./entities/LocatedAt";
import { createUserLoader } from "./utils/createUserLoader";

import { scrapeOSPCA } from "./controllers/scrapeOSCPA";
import { scrapeOHS } from "./controllers/scrapeOHS";
import { scrapeTHS } from "./controllers/scrapeTHS";

// import path from "path";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "pet-detectivev1",
    username: "postgres",
    password: "postgres",
    url: process.env.DATABASE_URL,
    // logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Animal, LocatedAt],
  });

  // await conn.runMigrations();

  //   Animal.delete({});
  scrapeOSPCA();
  scrapeTHS();
  scrapeOHS();

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
      resolvers: [HelloResolver, AnimalResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // Controllers
  // Scrape controller
  //   app.get("/scrape", scrape);

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:3000");
  });
};

main().catch((err) => {
  console.log(err);
});
