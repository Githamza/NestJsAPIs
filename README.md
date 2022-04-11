## Description

A Nest JS backend APIs linked to an SQLite Database + Prisma2 that similate an ecommerce catalog products
List of Apis :

- **getAllCategories** : get all categories list
- **getAllProducts** : get all products list :
- if hashed password passed (= user connected): return authentificated user products )
- If hashed password not passed = return public products.
- **getProductsFromList** : send list of products to get ( products on cart for example )
- **getUser** : get user by Id
- **logUser** : Login user ( id + passord)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Read documentation

To read documentation: `http://127.0.0.1:8080/`

## License

Nest is [MIT licensed](LICENSE).
