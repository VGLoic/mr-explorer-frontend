FROM node:12 as builder
# Set NODE_ENV to production
ENV NODE_ENV production
ENV GENERATE_SOURCEMAP false
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install dependencies
COPY package.json yarn.lock /home/node/app/
RUN yarn

# Copy source scripts
COPY . /home/node/app

# Build react SPA bundle
RUN yarn build

FROM nginx:1.17-alpine

# Copy nginx conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy build-target bundle
RUN mkdir -p /var/www/html
COPY --from=builder /home/node/app/build /var/www/html/

RUN touch /run/nginx.pid && \
  chown -R nginx:nginx /run/nginx.pid && \
  chown -R nginx:nginx /var/www && \
  chown -R nginx:nginx /usr/share/nginx && \
  chown -R nginx:nginx /var/cache/nginx

# Runtime
EXPOSE 8085
USER nginx
CMD ["nginx", "-g", "daemon off;"]
