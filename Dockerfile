FROM node:20.11
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "src/server.js"]
