FROM oven/bun:1 as base
ENV workDir /usr/src/app

WORKDIR ${workDir}

COPY package.json bun.lockb ${workDir}/

RUN bun install

COPY . .

RUN mkdir  -p ${workDir}/data
RUN chown -R bun:bun ${workDir}

ENV NODE_ENV=production

USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "./src/index.ts" ]