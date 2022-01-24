#transaction-commission

## Description

transaction-commission calculation API

## Dependencies

- NestJS (https://nestjs.com/)
- Jest (https://jestjs.io/)
- Class Validator (https://github.com/typestack/class-validator)
- Exchangerate.host (https://exchangerate.host/#/)

## Installation

```bash
$ npm install
```

## Endpoints

POST /transactions/commisions

Based on a set of rules the API will calculate the commission for the given transaction.

Request:
```
curl --request POST \
  --url http://localhost:3000/transactions/commissions \
  --header 'Content-Type: application/json' \
  --data '{
  "date": "2021-01-01",
  "amount": 800.00,
  "currency": "EUR",
  "client_id": 1
}'
```
Response:
```
{
    "amount": 0.03,
	"currency": "EUR"
}
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

## Test

```bash
# all suite
$ npm run test

# test coverage
$ npm run test:cov
```

## Author

Edgar (https://github.com/imedgar)

## License

Nest is [MIT licensed](LICENSE).
