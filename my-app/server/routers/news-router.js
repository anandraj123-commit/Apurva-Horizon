const express = require("express")
const newsController = require("../controllers/news-controller")
const {paginationController} = require("../controllers/pagination-controller")
const {paginatedResults} = require('../controllers/pagination-controller')
const router = express.Router()


router.route('/add').post(newsController.addNews)
// router.route('/update/:id').put(newsController.updateList)
router.route('/suggest/:id').put(newsController.suggestUpdate)
router.route('/approve/:id').put(newsController.approvedUpdate)
router.route('/reject/:id').put(newsController.rejectedUpdate)
router.route('/update/sensorship/:id').put(newsController.updateSensorship)
router.route('/view/:id').get(newsController.viewListItem)
router.route('/delete/:id').delete(newsController.deleteItem)
router.route('/changeStatus/:id').put(newsController.ActiveToInactiveReadyQueue)
router.route('/fetchall').get(newsController.fetchAllNews)
router.route('/users').get(paginatedResults("news"), paginationController)


module.exports = router;