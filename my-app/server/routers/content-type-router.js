const express = require("express")
const contentTypeController = require("../controllers/content-type-controller")
const {paginationController} = require("../controllers/pagination-controller")
const {paginatedResults} = require('../controllers/pagination-controller')
const router = express.Router()


router.route('/add').post(contentTypeController.addList)
router.route('/update/:id').put(contentTypeController.updateList)
router.route('/view/:id').get(contentTypeController.viewListItem)
router.route('/delete/:id').get(contentTypeController.deleteItem)
router.route('/fetchAll').get(contentTypeController.fetchAllContentType)
router.route('/users').get(paginatedResults("content-type"), paginationController)


module.exports = router;