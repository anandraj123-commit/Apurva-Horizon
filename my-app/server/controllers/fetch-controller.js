const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');

//fetching for listing it out on news form 
const fetchAllCategoryData = async (req, res) => {
    const collectionName = "category-type"
    const model = await connectDB();
    const data = await model.collection(collectionName).find().toArray()
    // console.log(data); 
    return res.send(data)
}

const fetchNewsByCategory = async (req, res) => {
    const collectionName = "news"
    const { categoryTitle, subtypeName } = req.params;
    const model = await connectDB();
    const data = await model.collection(collectionName).find({ type: categoryTitle, subcategory: subtypeName }).toArray();
    // console.log(data);

    return res.send(data)
}

const fetchCategoryNewsByPagination = async (req, res) => {

    //getting query paramter from frontend called url
    const category = req.query.category || "";
    const pageNo = parseInt(req.query.pageNo) || 0;
    const rowsPerPage = parseInt(req.query.rowsPerPage) || 12;


    //initialised model
    const model = await connectDB();

    //pipeline to count number of documents
    const countPipeline = [
        {
            $match: {
                type: category
            }
        },
        {
            $count: "count"
        }
    ];

    //pipeline initialised for final data
    const pipeline = [
        {
            $match: {
                type: category
            }
        },
        {
            $sort: { DisplayTime: -1 }
        },
        {
            $skip: pageNo * rowsPerPage
        },
        {
            $limit: rowsPerPage
        }
    ];

    const countData = await model.collection("news").aggregate(countPipeline).toArray();
    const data = await model.collection("news").aggregate(pipeline).toArray();
    const NoOfPages = countData[0].count / rowsPerPage;

    res.send({ data: data, count: NoOfPages });
}

const fetchEachSubtypeNewsByPagination = async (req, res) => {
    const category = req.query.category || "";
    const subcategory = req.query.subcategory || "null";
    const subcategoryCount = parseInt(req.query.subcategoryCount) || 10;
    const newsLimit = parseInt(req.query.newsLimit) || 10;

    const pipeline = [
        {
            '$match': {
                'type': category
            }
        },
        {
            $sort:{DisplayTime:-1}
        }
    ];

    if (subcategory !== "null") {
        pipeline.push({
            '$match': {
                'subcategory': subcategory
            }
        });
    }

    pipeline.push(
        {
            '$group': {
                '_id': '$subcategory',
                'news': {
                    '$push': '$$ROOT'
                }
            }
        },
        {
           $sort:{_id :1} 
        },
        {
            $limit: subcategoryCount
        },
        {
            $project: {
                _id: 0,
                subcategory: "$_id",
                news: {
                    $slice: ['$news', newsLimit]  // <-- limit news items here
                }
            }
        }
    );

    const model = await connectDB();
    const data = await model.collection("news").aggregate(pipeline).toArray();

    res.send(data);
}

const fetchSingleNews = async(req,res)=>{
    const { _id } = req.params;    

    const model = await connectDB();
    const data = await model.collection("news").find({ _id: new ObjectId(_id) }).toArray();    

    res.render('viewPage',{
        newsData : data
    })
}

module.exports = { fetchAllCategoryData, fetchNewsByCategory, fetchCategoryNewsByPagination, fetchEachSubtypeNewsByPagination, fetchSingleNews }
