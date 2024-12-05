const ContentType = require("../models/content-type-model")
const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');

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

const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const contentType = await ContentType.findById(id);

        if (!contentType) {
            return res.status(404).json({ message: "Content type not found" });
        }

        // Toggle the status field
        contentType.status = !contentType.status;
        const updatedContentType = await contentType.save();

        return res.status(200).json({
            message: "Content type status toggled successfully",
            data: updatedContentType, // Include updated content
        });
    } catch (error) {
        console.error(`Error toggling status for content type ID ${id}:`, error);
        return res.status(500).json({ message: "Failed to toggle content type status" });
    }
};


module.exports = { listOut, addList, updateList,viewListItem,deleteItem};