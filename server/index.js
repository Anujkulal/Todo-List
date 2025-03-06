const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const todoRoutes = require("./routes/todo");
const { connectDB } = require('./connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectDB(process.env.MONGO_URI);

app.use('/api/todos', todoRoutes);


// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});