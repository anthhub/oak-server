import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts"

import * as log from "https://deno.land/std/log/mod.ts"

import { server, redis } from "./src/config.ts"
import redisClient from "./src/redis.ts"

const router = new Router()

router
  .get("/", (ctx) => {
    ctx.response.body = "Hello1 World!"
  })
  .get("/favicon.ico", (ctx) => {
    ctx.response.body = "Hello favicon!"
  })
  .get("/views", async (ctx) => {
    const ok = await redisClient.get(redis.countKey).catch((err) => {
      log.error(err)
      return 0
    })
    ctx.response.body = { views: Number(ok ?? 0) }
  })
  .post("/views", async (ctx) => {
    const ok = await redisClient.incr(redis.countKey)
    ctx.response.body = {}
  })
  .get("/mock-views", async (ctx) => {
    const ok = await redisClient.incr(redis.countKey)
    ctx.response.body = {}
  })

const app = new Application()
app.use(async (ctx, next) => {
  await next().catch((err) => {
    log.error(err)
    ctx.response.status = Status.InternalServerError
  })
  log.info(`${ctx.request.method} ${ctx.request.url}`)
})

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  )
})

await app.listen({ ...server }).catch((err) => {
  log.error(err)
})
