FROM node:20-alpine
WORKDIR /app
COPY app/server.js ./server.js
RUN npm init -y && npm install express
EXPOSE 3000
CMD ["node", "server.js"]
