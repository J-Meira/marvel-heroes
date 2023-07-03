# Stage 0, "build-stage"
FROM node:18.16 as build-stage

WORKDIR /app

COPY ./nginx.conf /nginx.conf

COPY package*.json /app/

RUN yarn install --ignore-scripts --network-timeout 1000000000

COPY ./ /app/

RUN yarn build

# Stage 1, "deploy"
FROM nginx:1.22.1 as deploy-stage

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
