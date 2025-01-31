const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');

const addRegionalNews = async (req, res) => {
    try {
        const listItem = req.body;
        const dbo =await connectDB()
        // console.log(dbo);
        await dbo.collection("regional-news").insertOne(listItem)
        return res.status(200).json({ message: "Successfully added ✅" ,type:"success",timeout:3000})
    } catch (error) {
        return res.status(500).json({ message: "Failed to add ❌" ,type:"error",timeout:3000})
    }
}

const viewRegionalNews = async(req,res)=>{
    const { id } = req.params;
    try {
        const dbo =await connectDB()
        const Response = await dbo.collection("regional-news").findOne({ _id: new ObjectId(id) });
        return res.status(200).json(Response)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error ❌" })
    }

}

const updateRegionalNews = async (req, res) => {
    const { id } = req.params; // Extract the ID from the route parameter
    const { ContentType, title, description, subtype } = req.body; // Extract data from the request body

    try {
        const dbo = await connectDB(); // Connect to the database

        // Update the main content and subtypes
        const updatedCategory = await dbo.collection("category-type").updateOne(
            { _id: new ObjectId(id) }, // Match the document by ID
            {
                $set: {
                    ContentType,
                    title,
                    description,
                    subtype, // Subtypes as an array
                },
            }
        );
        res.status(200).json({ message: 'Category updated successfully ✅', data: updatedCategory });
    } catch (error) {
        // console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to Update ❌' });
    }
};


const deleteRegionalNews = async(req,res)=>{
    const { id } = req.params;
    try {
        const dbo =await connectDB()
        const Response = await dbo.collection("regional-news").findOne({ _id: new ObjectId(id) });
        if(!Response.status){
            return res.status(200).json({ message: "Status is already Inactive ⚠️",type:"info"})
        }
        // const data = await Response.json()
        // console.log(Response.status);
        
        const updatedContentType = await dbo.collection("regional-news").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { status :false } }
        );
        return res.status(200).json({ message: "Status changed to Inactive ✅",type:"success"})
    } catch (error) {
        return res.status(500).json({ message: "Status failed to change ❌" })
    }

}

//fetching for listing it out on news form 
const fetchAllCategoryData = async(req,res)=>{
    const collectionName = "category-type" 
    const model = await connectDB();
    const data = await model.collection(collectionName).find().toArray()
    // console.log(data); 
    return res.send(data)
}


module.exports={addRegionalNews,viewRegionalNews,deleteRegionalNews,updateRegionalNews,fetchAllCategoryData}
