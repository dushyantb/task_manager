FROM node:latest

COPY . /task_manager

WORKDIR /task_manager

RUN npm install
RUN npm run build

RUN chmod +x entrypoint.sh

CMD ["/bin/sh", "entrypoint.sh"]