FROM oven/bun

WORKDIR /app

COPY bun.lockb /app
COPY package.json /app

RUN bun i --frozen-lockfile

COPY . .

EXPOSE 5173

RUN bun i

CMD ["bun", "run", "dev"]