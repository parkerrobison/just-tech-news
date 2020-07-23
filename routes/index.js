const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// this is a RESTful practice that will throw a 404 error if we make a request to any endpoint that doesn't exist yet.
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;