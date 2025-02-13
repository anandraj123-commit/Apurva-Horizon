const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');

const addNews = async (req, res) => {
    try {
        const listItem = req.body;
        const dbo =await connectDB()
        // console.log(dbo);
        await dbo.collection("news").insertOne(listItem)
        return res.status(200).json({ message: "Successfully added ✅" ,type:"success",timeout:3000})
    } catch (error) {
        return res.status(500).json({ message: "Failed to add ❌" ,type:"error",timeout:3000})
    }
}


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
    return res.send(data)
}

const updateSensorship = async (req, res) => {
    const { id } = req.params; // Extract the ID from the route parameter
    try {
        const dbo = await connectDB(); // Connect to the database

        // Update the main content and subtypes
        const updatedToPending = await dbo.collection("news").updateOne(
            { _id: new ObjectId(id) }, // Match the document by ID
            {
                $set: {
                    sensorship: { stage: "pending", feedback: null }
                },
            }
        );
        res.status(200).json({ message: 'Sent for approval ✅'});
    } catch (error) {
        // console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to send for approval ❌' });
    }
};

const suggestUpdate = async (req, res) => {
    const { id } = req.params;
  const { suggestion } = req.body; // Getting suggestion from the request body

  try {
      const dbo = await connectDB(); // Connect to the database
    // Find the news item by ID

    const updatedToPending = await dbo.collection("news").updateOne(
        { _id: new ObjectId(id) }, // Match the document by ID
        {
            $set: {
                sensorship: { stage: "review", feedback: suggestion }
            },
        }
    );

    res.status(200).json({ message: 'Suggestion updated successfully ✅'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, failed to update suggestion ❌' });
  }
};
const approvedUpdate = async (req, res) => {
    const { id } = req.params;
  const { suggestion } = req.body; // Getting suggestion from the request body

  try {
      const dbo = await connectDB(); // Connect to the database
    // Find the news item by ID

    const updatedToPending = await dbo.collection("news").updateOne(
        { _id: new ObjectId(id) }, // Match the document by ID
        {
            $set: {
                sensorship: { stage: "approved", feedback: null }
            },
        }
    );

    res.status(200).json({ message: 'Suggestion updated successfully ✅'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, failed to update suggestion ❌' });
  }
};
const rejectedUpdate = async (req, res) => {
    const { id } = req.params;
  const { reason } = req.body; // Getting suggestion from the request body

  try {
      const dbo = await connectDB(); // Connect to the database
    // Find the news item by ID

    const updatedToPending = await dbo.collection("news").updateOne(
        { _id: new ObjectId(id) }, // Match the document by ID
        {
            $set: {
                sensorship: { stage: "rejected", feedback: reason }

            },
        }
    );

    res.status(200).json({ message: 'Suggestion updated successfully ✅'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, failed to update suggestion ❌' });
  }
};


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

const ActiveToInactiveReadyQueue = async(req,res)=>{
    const { id } = req.params;
  
    try {
        const dbo = await connectDB(); // Connect to the database
      // Find the news item by ID
  
      const updatedToPending = await dbo.collection("news").updateOne(
          { _id: new ObjectId(id) }, // Match the document by ID
          {
              $set: {
                  status:false,
              },
          }
      );
  
      res.status(200).json({ message: 'Succesfully changed status to inactive ✅'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, failed to update status to inactive ❌' });
    }
}
module.exports={fetchAllNews,viewListItem,deleteItem,addNews,updateSensorship,suggestUpdate,approvedUpdate,rejectedUpdate,ActiveToInactiveReadyQueue}
