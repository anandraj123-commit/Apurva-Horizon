const express=require("express")
const contentTypeController = require("../controllers/content-type-controller")
const router=express.Router()


router.route('/list').get(contentTypeController.listOut)
router.route('/add').post(contentTypeController.addList)


module.exports=router;