FROM node:20-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN npx yarn add expo
RUN npx expo install

COPY . .

RUN npx expo export -p web

FROM nginx:1.19.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
