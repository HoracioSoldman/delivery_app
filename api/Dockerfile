FROM node:10.16-alpine
WORKDIR /usr/src/app
COPY package*.json build ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
