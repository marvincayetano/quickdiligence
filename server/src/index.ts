import "reflect-metadata";
import "dotenv-safe/config";

// import Redis from "ioredis";
import express from "express";
// import session from "express-session";
// import connectRedis from "connect-redis";
import cors from "cors";

import { __prod__ } from "./constants";
import { getAnalyze } from "./controllers/stock";

const main = async () => {
  const app = express();

  //   const RedisStore = connectRedis(session);
  //   const redis = new Redis(process.env.REDIS_URL);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  //   app.use(
  //     session({
  //       name: COOKIE_NAME,
  //       store: new RedisStore({
  //         client: redis,
  //         disableTouch: true,
  //       }),
  //       cookie: {
  //         maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //         httpOnly: true,
  //         sameSite: "lax", // csrf
  //         secure: __prod__, // cookie only works in https
  //       },
  //       saveUninitialized: false,
  //       secret: process.env.SESSION_SECRET,
  //       resave: false,
  //     })
  //   );

  app.get("/analyze/:symbol", getAnalyze);

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:3000");
  });
};

main().catch((err) => {
  console.log(err);
});
