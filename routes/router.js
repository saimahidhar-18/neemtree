const router = require('express').Router();
const controller = require('../controller/convert');

router.post('/submitFile', controller.converter);
router.get('/index', controller.index);

module.exports = router;
