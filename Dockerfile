FROM node:20 AS builder

WORKDIR /build

COPY . .
RUN npm ci && npm run build

FROM node:20-slim

COPY --chown=node:node --from=builder /build/dist/ /runtime/dist/
COPY --chown=node:node --from=builder /build/package.json /runtime
COPY --chown=node:node --from=builder /build/package-lock.json /runtime

USER node
WORKDIR /runtime
ENV NODE_ENV=production
EXPOSE 8080

RUN npm ci --omit=dev

CMD [ "node", "--enable-source-maps", "." ]
