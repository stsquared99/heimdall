FROM node:7-alpine

RUN mkdir -p /usr/local/cloudflare-heimdall

WORKDIR /usr/local/cloudflare-heimdall

COPY package.json /usr/local/cloudflare-heimdall

RUN npm install

COPY . /usr/local/cloudflare-heimdall

RUN mv docker.config.js config.js


EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm", "run"]

CMD ["dev"]
