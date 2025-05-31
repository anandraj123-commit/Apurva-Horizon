const express = require('express')
const router = express.Router();
const fetchRouter = require('../routers/fetch-router')

router.use('/fetch-data',fetchRouter);

module.exports=router;