require('dotenv').config();
const express = require('express');

const app = express();
const contentType = require('./routers/content-type-router');
const categoryType = require('./routers/category-type-router');
const fileUploadRouter = require('./routers/file-upload-router');
const newsRouter = require('./routers/news-router');
const searchRouter = require('./routers/search-router');
const path = require('path');
// const vidRouter = require('./routers/Videorouter');
const vidRouter = require('./routers/Videouploadrouter');
const cors = require('cors');
// const connectDb = require('./utils/db');
const corsOption = {
    origin: "http://localhost:3000",
    method: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
}
app.use(cors(corsOption));
app.use(express.json())
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads', 'videos')));
app.use('/api/content-type', contentType)
app.use('/api/file', fileUploadRouter);
app.use('/api/category-type', categoryType)
app.use('/api/news', newsRouter)
app.use('/api/search', searchRouter);
// app.use('/api/upload', videoRouter);
app.use('/api/videos', vidRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads', 'videos')));
const PORT = 5000;
app.listen(PORT, () => {
    console.log('server is running at port:', PORT);
})

