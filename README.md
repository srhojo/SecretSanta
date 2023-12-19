# SecretSanta
Juego del amigo invisible (Secret Santa)


## Install

First of all we need to install components with npm for each proyect. So we need to execute the following commands

```bash
cd server && npm install
cd web && npm install
npm install
```


## Usages

We have diferents scripts to execute the project from the main folder.

* Run Only Web in develop mode

    ```bash
        npm run web
    ```

* Run only Server in develop mode

    ```bash
    npm run server
    ```

* Run web and server in develop mode

    ```bash
    npm run dev-all
    ```

* Build web

    ```bash
    npm run build-web
    ```

* Copy builded web to server

    ```bash
    npm run copy-prod-front
    ```

* Build web and copy files to server

    ```bash
    npm run package
    ```

## Docker

docker tag srhojo/secret-santa:latest test:latest
docker push test:latest

# Build for ARM64 
docker build --platform=linux/arm64 -t srhojo/secret-santa:latest-arm64 .

docker buildx build --platform=linux/amd64 -t srhojo/secret-santa:latest-amd64 .
docker push srhojo/secret-santa:latest-amd64

docker build -t srhojo/secret-santa:latest-arm64 .
