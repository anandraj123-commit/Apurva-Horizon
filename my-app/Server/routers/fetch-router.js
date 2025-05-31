const express = require("express")
const router = express.Router()
const fetchController = require('../controllers/fetch-controller')

router.get("/fetchAllCategory",fetchController.fetchAllCategoryData)
router.get("/fetchNewsByCategory/:categoryTitle/:subtypeName",fetchController.fetchNewsByCategory)
router.get("/fetchParticularCategory/paginated",fetchController.fetchCategoryNewsByPagination)
router.get("/fetchEachSubcategory/paginated",fetchController.fetchEachSubtypeNewsByPagination)
router.get("/singleNews/:_id",fetchController.fetchSingleNews)

module.exports = router;
