FROM node:20.17.0-slim as base
WORKDIR /app

FROM base as build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Instala dependencias
COPY package.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Etapa final
FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]