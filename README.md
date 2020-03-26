# nodejs-jwt-mongodb

Sample API to demonstrate the authentication operation with nodejs, express, JSON Web Token (JWT), mongoose and mongoDB

# Before starting the API
* Install mongoDB: https://docs.mongodb.com/manual/installation/.
* Access the mongo shell.
```bash
mongo --host localhost --port 27017
```
* Create an admin user to read/write any database.
```bash
use admin
```
```bash
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

# Steps to start the API
* Git clone this repository.
```bash
git clone https://github.com/KarnYong/nodejs-jwt-mongodb.git
```
* Take a look at .env file in case you want to change mongodb url, JWT key or api running port.
* Finally start the API.
```bash
cd nodejs-jwt-mongodb
yarn install
yarn start
```

# API detail
This section describe how to use API:

## Registration
* Method: POS
* Request URL: http://localhost:3000/users
* Body type: raw - JSON
* Body:
```bash
{
	"name": "My Admin",
	"email": "myadmin@gmail.com",
	"password": "1234"
}
```

## Login
* Method: POS
* Request URL: http://localhost:3000/users/login
* Body type: raw - JSON
* Body:
```bash
{
	"email": "myadmin@gmail.com",
	"password": "1234"
}
```
* Response:
```bash
{
    "status": "ok",
    "user": {
        "_id": "...",
        "name": "My Admin",
        "email": "myadmin@gmail.com",
        "password": "...",
        "tokens": [
            {
                "_id": "...",
                "<<TOKEN>>"
            }
        ],
        "__v": 1
    },
    "token": "<<TOKEN>>"
}
```

## Get user detail (authentication required)
* Method: POST
* Request URL: http://localhost:3000/users/me
* Authorization Type: Bearer Token
* Token: `<<TOKEN>>`

## Logout (Remove one token)
* Method: POST
* Request URL: http://localhost:3000/users/me/logout
* Authorization Type: Bearer Token
* Token: `<<TOKEN>>`
  
## Logout (Remove all token(s))
* Method: POST
* Request URL: http://localhost:3000/users/me/logoutall
* Authorization Type: Bearer Token
* Token: `<<TOKEN>>`
