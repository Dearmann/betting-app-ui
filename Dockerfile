### STAGE 1: Build ###
FROM node:16.16.0-alpine3.16 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.23.2-alpine
COPY default.conf /temp/default.conf
COPY inject-env-var.sh /
COPY --from=build /usr/src/app/dist/betting-app-ui /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "sh", "/inject-env-var.sh" ]
CMD ["nginx", "-g", "daemon off;"]