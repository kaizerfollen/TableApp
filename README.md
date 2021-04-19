# oxem-studio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Load docker build
```
docker build -t oxem-studio/dockerize-vuejs-app .
```

### Run docker app
```
docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 oxem-studio/dockerize-vuejs-app
```