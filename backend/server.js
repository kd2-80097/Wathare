const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataRouter = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wathare', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

  // Define schema and specify the collection name
//const dataSchema = new mongoose.Schema({
    // Schema definition here
  //}, { collection: 'cwathare' }); // Specify collection name here
  

  
// Routes
app.use('/api/data', dataRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));