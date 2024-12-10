const express = require("express")
const {addCategory,viewListItem,deleteItem, updateCategory} = require("../controllers/category-controller")
const { paginatedResults, paginationController } = require("../controllers/pagination-controller")
const router = express.Router()


router.route('/add').post(addCategory)
router.route('/view/:id').get(viewListItem)
router.route('/update/:id').put(updateCategory)
router.route('/users').get(paginatedResults("category-type"), paginationController)
router.route('/delete/:id').delete(deleteItem)



module.exports = router;