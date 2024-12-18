const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');

const viewListItem = async(req,res)=>{
    const { id } = req.params;
    try {
        const dbo =await connectDB()
        const Response = await dbo.collection("news").findOne({ _id: new ObjectId(id) });
        return res.status(200).json(Response)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error ❌" })
    }

}

const fetchAllNews= async(req,res)=>{
    const collectionName = "news" 
    const model = await connectDB();
    const data = await model.collection(collectionName).find().toArray()
    // console.log(data); 
    return res.send(data)
}

const deleteItem = async(req,res)=>{
    const { id } = req.params;
    // console.log(id);
    

    try {
        const dbo =await connectDB()
        const Response = await dbo.collection("news").deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "Status changed successfully ✅" })
    } catch (error) {
        return res.status(500).json({ message: "Failed to change Status ❌" })
    }

}

module.exports={fetchAllNews,viewListItem,deleteItem}
