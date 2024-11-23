const connectDB = require('../utils/db')

function paginatedResults() {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        const model = await connectDB();
        // console.log(model);
        
        if (endIndex < await model.collection("content-type").countDocuments()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.collection("content-type").find().limit(limit).skip(startIndex).toArray()
            results.totalCount = await model.collection("content-type").countDocuments();
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

const paginationController = (req, res) => {
    res.json(res.paginatedResults)
}

module.exports={paginatedResults,paginationController}