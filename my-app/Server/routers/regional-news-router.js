const express = require("express")
const regionalNewsController = require("../controllers/regional-news-controller")
const {paginationController} = require("../controllers/pagination-controller")
const {paginatedResults} = require('../controllers/pagination-controller')
// const contentType = require('../models/content-type-model')
// const { upload, uploadFile } = require('../controllers/Imagehandler');

const router = express.Router()


router.route('/add').post(regionalNewsController.addRegionalNews)
// router.route('/update/:id').put(contentTypeController.updateList)
router.route('/view/:id').get(regionalNewsController.viewRegionalNews)
router.route('/delete/:id').get(regionalNewsController.deleteRegionalNews)
// router.route('/fetchAll').get(contentTypeController.fetchAllContentType)
// router.route('/users').get(paginatedResults("content-type"), paginationController)

// router.post('/upload', upload.single('filedata'), uploadFile);


module.exports = router;