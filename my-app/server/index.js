require('dotenv').config();
const express = require('express');
const app = express();
const contentType = require('./routers/content-type-router');
const categoryType = require('./routers/category-type-router');
const newsRouter = require('./routers/news-router');
const searchRouter = require('./routers/search-router');

const cors = require('cors');
const connectDb = require('./utils/db');


const corsOption = {
    origin: "http://localhost:3000",
    method: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
}

app.use(cors(corsOption));


app.use(express.json())
app.use('/api/content-type', contentType)
app.use('/api/category-type', categoryType)
app.use('/api/news', newsRouter)
app.use('/api/search', searchRouter)



const PORT = 5000;
app.listen(PORT, () => {
    console.log('server is running at port:', PORT);
})

