# Next.js OpenJira App
Para correr localmente, se necesita la base de dats

````
docker-compose up -d
```

* El -d, significa __detached__

MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```


## Conigurar las vaiables de entorno
Renombrar el archivo __.env.template__ a __.env__
*MongoDB URL Local:
MONGO_URL=mongodb://localhost:27017/entriesdb

*Reconstuir los módulos de Node

## Llenar la base de datos con infromación de pruebas

Llamara:

``` 
  http://localhost:3000/api/seed 
```