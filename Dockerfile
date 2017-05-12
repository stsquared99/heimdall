FROM node:7-alpine

RUN mkdir -p /usr/local/heimdall

WORKDIR /usr/local/heimdall

COPY . /usr/local/heimdall

RUN yarn

RUN ln -s /usr/local/heimdall/node_modules/magnet/build/bin/magnet /usr/local/bin/magnet \
	&& magnet build

RUN mv docker.config.js config.js

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm", "run"]

CMD ["dev"]
