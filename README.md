# task_manager

#### run tests
- change value of `HOST` in `.env` file to `localhost`
- start `postgres instance`
```
docker-compose -f docker-compose.local.yml up
```

- execute following:
```
npm install
npm run test
```

#### local development
- change value of `HOST` in `.env` file to `localhost`
- start `postgres instance`
```
docker-compose -f docker-compose.local.yml up
```
- execute follwong:
```
npm run tearDownDB
npm run setupDB
npm run dev
```
- we can use `local.apiClient.http` to access the APIs locally.
_NOTE: you need [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin installed in VS Code IDE_

#### start server
- change value of `HOST` in `.env` file to `host.docker.internal`
- execute following:
```
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up
```
- we can use `docker.apiClient.http` to access the APIs locally.
_NOTE: you need [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin installed in VS Code IDE_
