FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f package-lock.json ]; then npm install --force; \
  elif [ -f yarn.lock ]; then yarn install; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm install; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]