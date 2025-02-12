FROM node:20.9

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install --legacy-peer-deps

COPY . /usr/src/app
RUN npm run build:css

RUN npm run build

EXPOSE 3000

# start app
CMD ["npm", "start"]