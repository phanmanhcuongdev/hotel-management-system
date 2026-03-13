# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# copy dependency trước để tận dụng cache
COPY package*.json ./

RUN npm ci

# copy source
COPY . .

# build production
RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM nginx:alpine

# copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]