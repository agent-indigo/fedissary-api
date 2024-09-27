FROM node:latest
WORKDIR /fedissary-api
COPY . .
RUN npm i --production
EXPOSE 8080
CMD ["npm", "start"]