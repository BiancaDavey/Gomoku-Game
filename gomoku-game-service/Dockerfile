FROM node:16-alpine

WORKDIR /gomoku-game-service

ADD ./package.json ./
# 01/10 Trying without yarn lock.
# 01/10 Does it need package.json lock instead?
# 01/10 If it doesn't work, add yarn lock.
ADD ./yarn.lock ./  
ADD ./tsconfig.json ./
ADD ./.env ./

RUN yarn
# add --ignore-scripts to skip postinstall script. 
# RUN yarn --ignore-scripts   # Line is RUN yarn in wk.10 Lecture 4.

CMD yarn bootstrapdb; yarn dev