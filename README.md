# GROUPOMANIA API #

## Installation ##
The backend API depends on the following packages.
- Install NodeJS
- Install MySQL 8.0

Clone this repo, run the following command to install required Node packages:

```
npm install
```

Create `.env` file in root folder and create following environment variables:
```
MYSQL_USER=root
MYSQL_PASSWORD=pass
MYSQL_HOST=localhost
MYSQL_DB=project7
DB_DIALECT=mysql
PORT=3000
RANDOM_TOKEN_SECRET=your_secret_token
```


## Usage ##

Run `npm run start`. This should both run the local server and launch your browser.

Use `Ctrl+C` in the terminal to stop the local server.
