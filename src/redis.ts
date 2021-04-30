import { connect } from "https://deno.land/x/redis/mod.ts"
import { redis } from "./config.ts"

const client = await connect({
  ...redis,
})

export default client
