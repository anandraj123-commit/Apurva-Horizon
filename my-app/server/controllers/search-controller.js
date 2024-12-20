// const { response } = require('express');
const connectDB = require('../utils/db');


//fetching for listing it out on category form 
const searchFunctionality = async (req, res) => {
    const { collectionName } = req.params;
    const { field, filter, sort, page, limit } = req.query;


    const sortField = sort.split(",").reduce((acc, field) => {
        const order = field.startsWith('-') ? -1 : 1; // Determine order based on prefix.
        const fieldName = field.startsWith('-') ? field.slice(1) : field; // Remove '-' if present.
        acc[fieldName] = order; // Add field and order to the result object.
        return acc;
    }, {})
    //pagination    
    const startIndex = (parseInt(page) - 1) * parseInt(limit)
    const endIndex = parseInt(page) * parseInt(limit)

    const model = await connectDB();
    const data = await model.collection(collectionName)
        .find({ [field]: { $regex: filter, $options: 'i' } })
        .limit(parseInt(limit))
        .skip(startIndex)
        .sort(sortField)
        .toArray()

    // if (endIndex < data.length) {
    //     results.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndex > 0) {
    //     results.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    return res.send(data)
}

module.exports = { searchFunctionality };