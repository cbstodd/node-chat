require('dotenv').config();
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

// Renders public directory.
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});