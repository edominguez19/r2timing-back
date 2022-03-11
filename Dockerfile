FROM node:12
WORKDIR /app
COPY package.json ./
RUN npm cache clean --force && npm install
COPY . /app
EXPOSE 3000
CMD ["npm","start"]
