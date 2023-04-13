FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm ci

LABEL author.name="Huy Le Minh"
LABEL author.email="leminhhuy.hcmus@gmail.com"

EXPOSE 5001
CMD ["npm", "start"]