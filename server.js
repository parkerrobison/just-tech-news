const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers')

const app = express();
const PORT = process.env.PORT || 3001;


// these following lines of code set up handlebars.js as a template engine.
const exphbs = require('express-handlebars')
const hbs = exphbs.create({ helpers });

// the following code sets up an Express.js session and connects the session to our sequelize database.
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static method is a built-in express.js middleware function that can take all of the contents
// of a folder and serve them as static assets.
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

// turn on connection to db and server
// sync means that Sequelize is taking the models and connecting them to the associated db tables.
// if they don't exist yet, it will create it.
// force: true would drop and re-create all of the database tables on startup.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});