const express = require("express")
const newsController = require("../controllers/news-controller")
const {paginationController} = require("../controllers/pagination-controller")
const {paginatedResults} = require('../controllers/pagination-controller')
const router = express.Router()


// router.route('/add').post(contentTypeController.addList)
// router.route('/update/:id').put(contentTypeController.updateList)
router.route('/view/:id').get(newsController.viewListItem)
router.route('/delete/:id').delete(newsController.deleteItem)
router.route('/fetchall').get(newsController.fetchAllNews)
router.route('/users').get(paginatedResults("news"), paginationController)


module.exports = router;