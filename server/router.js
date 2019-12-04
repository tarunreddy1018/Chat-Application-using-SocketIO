const express = require('express');
const router = express.Router();

const preflight = require('./controllers/preflight');
const auth = require('./controllers/auth');

// Preflight Request
router.use(preflight.setPreflight);

router.get('/', (req, res) => {
    res.send('Server is up and running');
});

router.post('/login', auth.postLogin);

router.post('/signup', auth.postSignup);

router.post('/logout', auth.postLogout);

router.post('/join', auth.verifyDetails);

module.exports = router;