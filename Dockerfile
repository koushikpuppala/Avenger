FROM node:14

# Create app directory
WORKDIR /puppalakoushik

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY sd9peo5nhc0t158
ENV PM2_SECRET_KEY adxdfubbvr0f1ye

CMD ["pm2-runtime", "src/index.js"]