# 建立react環境
FROM node:14 as builder
# set working directory
WORKDIR /app
COPY . .
RUN npm install 
# COPY package*.json ./
# RUN npm install
# COPY tsconfig.json ./
# COPY src src/
RUN npm run build

# 配置nginx
FROM nginx:alpine
# set working directory
WORKDIR /usr/share/nginx/html
# remove default nginx assets
# RUN rm -rf ./*
# set our nginx default
# COPY nginx/nginx.conf /etc/nginx/conf.d
RUN rm -rf /etc/nginx/conf.d
# COPY conf/conf./default.conf /etc/nginx/conf.d
COPY default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/build /usr/share/nginx/html
COPY --from=builder /app/build .
# EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]