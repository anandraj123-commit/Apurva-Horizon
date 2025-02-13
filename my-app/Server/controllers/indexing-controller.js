const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');
// const fs = require("fs");
const axios = require("axios");

const indexingNews = async (req, res) => {
  try {
    const { collectionName } = req.params; // Extract the collection name from route params
    const {
      page,
      limit,
      sort,  // Sort as JSON object
      filters // Filters as JSON object
    } = req.query;

    const parsedFilters = filters ? JSON.parse(filters) : {};
    const parsedSort = sort ? JSON.parse(sort) : {};

    // Connect to the database
    const model = await connectDB();
    const results = {};


    //intialised matchStage for pipeline used in aggregation
    const matchStage = {
      $match: {}
    };

    // Apply filters (field-based search)
    for (const [field, value] of Object.entries(parsedFilters)) {
      if (field === '_id' && ObjectId.isValid(value)) {
        matchStage.$match[field] = new ObjectId(value);
      } else if (field === 'createdAt') {
        // console.log(value);

        if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          // Convert 'YYYY-MM-DD' to Date object at UTC 00:00:00
          const startDate = new Date(`${value}T00:00:00.000Z`);
          const endDate = new Date(`${value}T23:59:59.999Z`);
          // console.log(startDate, endDate);
          matchStage.$match[field] = {
            $gte: startDate,
            $lt: endDate
          };
          // console.log("Match Query:", JSON.stringify(matchStage.$match, null, 2));

        }
      } else if (typeof value === 'boolean') {
        matchStage.$match[field] = value;
      } else {
        matchStage.$match[field] = { $regex: value, $options: 'i' };
      }
    }





    // Building $sort stage dynamically
    const sortStage = Object.keys(parsedSort).length ? { $sort: parsedSort } : { $sort: { _id: 1 } };


    // Pagination logic
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    //Agregation pipeline for results
    const pipeline = [
      {
        $unwind: "$subtype", // Break subtypes into separate documents
      },
      {
        $lookup: {
          from: "news",
          localField: "subtype.name", // Match the 'value' from collection1
          foreignField: "subcategory", // Match it with 'subcategory' in collection2
          as: "matched_subtype",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          createdAt: { $first: "$createdAt" },
          subtypes: {
            $push: {
              name: "$subtype.name",
              value: "$subtype.value",
              used: {
                $cond: {
                  if: { $gt: [{ $size: "$matched_subtype" }, 0] },
                  then: true,
                  else: false,
                },
              },
            },
          },
        },
      },
      {
        $unwind: "$subtypes", // Break subtypes into separate documents
      },
      matchStage,
      sortStage,
      { $skip: skip },
      { $limit: pageSize }
    ];

    // Separate count pipeline (to get total filtered records)
    const countPipeline = [
      {
        $unwind: "$subtype", // Break subtypes into separate documents
      },
      {
        $lookup: {
          from: "news",
          localField: "subtype.name", // Match the 'value' from collection1
          foreignField: "subcategory", // Match it with 'subcategory' in collection2
          as: "matched_subtype",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          createdAt: { $first: "$createdAt" },
          subtypes: {
            $push: {
              name: "$subtype.name",
              value: "$subtype.value",
              used: {
                $cond: {
                  if: { $gt: [{ $size: "$matched_subtype" }, 0] },
                  then: true,
                  else: false,
                },
              },
            },
          },
        },
      },
      {
        $unwind: "$subtypes", // Break subtypes into separate documents
      },
      matchStage,
      { $count: "totalCount" }
    ];


    results.results = await model.collection(collectionName).aggregate(pipeline).toArray();
    // console.log(results.results);
    const countResult = await model.collection(collectionName).aggregate(countPipeline).toArray();
    results.totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;

    // Send the results as a response
    res.status(200).send(results);
  } catch (error) {
    console.error("Error in searchFunctionality:", error);
    res.status(500).send({ error: "An error occurred while fetching data." });
  }
};


const countryData = async (req, res) => {
  try {
    const API_KEY = "Zk10ZVljb0Iybnl1ZE1aU21IY25xUWR0ekpHcXhSSGNMak40S1A3NA==";
    const BASE_URL = "https://api.countrystatecity.in/v1";
    const HEADERS = { "X-CSCAPI-KEY": API_KEY };

    async function fetchCountries() {
      const url = `${BASE_URL}/countries`;
      try {
        const response = await axios.get(url, { headers: HEADERS });
        return response.data;
      } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
      }
    }

    async function fetchStates(countryCode) {
      const url = `${BASE_URL}/countries/${countryCode}/states`;
      try {
        const response = await axios.get(url, { headers: HEADERS });
        return response.data;
      } catch (error) {
        console.error(`Error fetching states for ${countryCode}:`, error);
        return [];
      }
    }

    async function generateDataDocument() {
      const countries = await fetchCountries();
      
      return countries;
    }

    const data = await generateDataDocument();
    res.status(200).send({ mssg: "All countries fetched succesfully" ,data:data});
  } catch (error) {
    console.error("Error in countryData:", error);
    res.status(500).send({ error: "An error occurred while fetching data." });
  };
}



module.exports = { indexingNews, countryData };