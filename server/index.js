const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json())
const cookieParser = require('cookie-parser')
app.use(cookieParser());
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');

connectDB();

app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log(`App successfully running on port ${PORT}`)
})