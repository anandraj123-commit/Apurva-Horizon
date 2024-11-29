const express = require("express")
const contentTypeController = require("../controllers/content-type-controller")
const {paginationController} = require("../controllers/pagination-controller")
const {paginatedResults} = require('../controllers/pagination-controller')
const contentType = require('../models/content-type-model')
const router = express.Router()


router.route('/list').get(contentTypeController.listOut)
router.route('/add').post(contentTypeController.addList)
router.route('/update/:id').put(contentTypeController.updateList)
router.route('/view/:id').get(contentTypeController.viewListItem)
router.route('/delete/:id').get(contentTypeController.deleteItem)
router.route('/users').get(paginatedResults(contentType), paginationController)


module.exports = router;