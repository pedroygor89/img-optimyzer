FROM node:14
WORKDIR /usr/src/api_tinifypng
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 7000
CMD ["npm", "run", "dev-linux"]