FROM node:21-slim
WORKDIR /usr/app
COPY ./ /usr/app/
RUN npm install -g @angular/cli
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["node", "index.js"]