const ContentType=require("../models/content-type-model")

const listOut=async(req,res)=>{
    try {
        const Response = await ContentType.find({});
        return res.status(200).json(Response)
    } catch (error) {
        return res.status(500).json({message:"message not delivered"})
    }
}


const addList=async(req,res)=>{
    try {
        const listItem = req.body;
        await ContentType.create(listItem);
        return res.status(200).json({message:"new list item is successfully added"})
    } catch (error) {
        return res.status(500).json({message:"message not delivered"})
    }
}

module.exports={listOut,addList};