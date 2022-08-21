FROM node:12-alpine

# 代表生产环境
ENV PROJECT_ENV production
# 许多 package 会根据此环境变量，做出不同的行为
# 另外，在 webpack 中打包也会根据此环境变量做出优化，但是 create-react-app 在打包时会写死该环境变量
ENV NODE_ENV production
WORKDIR /code
ADD . /code
RUN npm install && npm run build:prod

#多阶段构建
FROM nginx:1.23.1-alpine
# 维护者信息
MAINTAINER jiange 

# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下
COPY dist/ /usr/share/nginx/html/
# COPY --from=builder /src/dist /usr/share/nginx/html/
COPY config/default.conf /etc/nginx/conf.d/default.conf
