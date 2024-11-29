const ContentType = require("../models/content-type-model")

const listOut = async (req, res) => {
    try {
        const Response = await ContentType.find({});
        return res.status(200).json(Response)
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" })
    }
}


const addList = async (req, res) => {
    try {
        const listItem = req.body;
        await ContentType.create(listItem);
        return res.status(200).json({ message: "new list item is successfully added" })
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" })
    }
}

const updateList = async(req, res) => {
    const { id } = req.params; // Get the ID from the route
    const { title, status ,description } = req.body; // Get updated data from the request body

    try {
        const updatedContentType = await ContentType.findByIdAndUpdate(
            id, 
            { title, status ,description}, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedContentType) {
            return res.status(404).json({ message: 'Content type not found' });
        }

        res.json({ message: 'Content type updated successfully', data: updatedContentType });
    } catch (error) {
        console.error('Error updating content type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const viewListItem = async(req,res)=>{
    const { id } = req.params;
    try {
        const Response = await ContentType.find({_id:id});
        return res.status(200).json(Response)
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" })
    }

}

const deleteItem = async(req,res)=>{
    const { id } = req.params;
    try {
        const dbo =await connectDB()
        const Response = await dbo.collection("content-type").findOne({ _id: new ObjectId(id) });
        // const data = await Response.json()
        // console.log(Response.status);
        
        const updatedContentType = await dbo.collection("content-type").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { status :false } }
        );
        return res.status(200).json({ message: "Status changed successfully" })
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" })
    }

}

module.exports = { listOut, addList, updateList,viewListItem,deleteItem};