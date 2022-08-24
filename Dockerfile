FROM node:16-alpine

WORKDIR /user/app

COPY package.json  ./
RUN yarn && yarn prisma db push 

COPY . .

EXPOSE 3000

CMD ["yarn","start"]