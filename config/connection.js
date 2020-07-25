// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database, pass in your MySQL information for
// username and password
// the process.env variables serve as a stand in for database name, username, and password.
// this is done so private info like passwords aren't displayed publicly. NPM package dotenv does this.
// the .env file contains "sensistive info" and then we list in gitignore to prevent it from being displayed.
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else{
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;