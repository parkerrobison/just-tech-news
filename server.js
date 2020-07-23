const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);

// turn on connection to db and server
// sync means that Sequelize is taking the models and connecting them to the associated db tables.
// if they don't exist yet, it will create it.

// force: true would drop and re-create all of the database tables on startup.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});