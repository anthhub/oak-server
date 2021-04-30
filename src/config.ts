import { config } from "https://deno.land/x/dotenv/mod.ts"
import { isDocker } from "https://deno.land/x/is_docker/mod.ts"

const path = (await isDocker()) ? "./.env.docker" : "./.env"

const cfg = config({ safe: true, path })

export const server = {
  hostname: cfg.HOST,
  port: Number(cfg.PORT),
}

export const redis = {
  hostname: cfg.REDIS_HOST,
  port: Number(cfg.REDIS_PORT),
  countKey: "deno:request:count",
}
