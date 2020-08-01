const router = require('express').Router();

const apiRoutes = require('./api');

// this file will contain all of the user-facing routes (homepage, login, etc)
const homeRoutes = require('./home-routes')

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);

// this is a RESTful practice that will throw a 404 error if we make a request to any endpoint that doesn't exist yet.
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;