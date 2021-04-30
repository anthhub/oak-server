
FROM hayd/alpine-deno:1.9.2 AS builder

EXPOSE 9000

COPY . /app

WORKDIR /app

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]




