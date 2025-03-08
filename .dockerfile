FROM node:18-alpine 
COPY . .
RUN npm install
EXPOSE 9000
CMD ["node", "bin/www"]
