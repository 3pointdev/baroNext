# # Install dependencies only when needed
# FROM node:18-alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat tzdata
# WORKDIR /resource
# COPY resource/package.json ./
# RUN npm install --force

# # Rebuild the source code only when needed
# # FROM node:16.13.0 AS builder
# # WORKDIR /resource
# # COPY resource/ .
# # COPY --from=deps /resource/node_modules ./node_modules

# # Develope image, copy all the files and run next
# FROM node:18-alpine AS runner
# WORKDIR /resource

# COPY --from=deps /resource/node_modules ./node_modules

# # RUN addgroup -g 1001 -S nodejs
# # RUN adduser -S nextjs -u 1001

# # You only need to copy next.config.js if you are NOT using the default configuration
# COPY /resource .
# COPY /resource/next.config.js ./
# COPY /resource/.next ./.next
# COPY --from=deps /resource/node_modules ./node_modules

# # RUN yarn add next

# USER root

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry.
# # ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["npm","run", "dev"]



# Install dependencies only when needed
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat tzdata
WORKDIR /resource
COPY resource/package.json ./
RUN npm install --force

# Develope image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /resource

COPY --from=deps /resource/node_modules ./node_modules

ENV NODE_ENV development

# You only need to copy next.config.js if you are NOT using the default configuration
COPY /resource .
COPY /resource/next.config.js ./
COPY /resource/.next ./.next
COPY --from=deps /resource/node_modules ./node_modules

# RUN yarn add next

USER root

# Next.js collects completely anonymous telemetry data about general usage.

CMD ["npm","run", "dev"]