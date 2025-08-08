const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const forumRoutes = require('./routes/forumRoutes');
const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
})
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/forum', forumRoutes);
module.exports = app;