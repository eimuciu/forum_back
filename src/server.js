const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// route imports
const { userRoutes } = require('./routes/userRoute');
const { questionRoutes } = require('./routes/questionRoute');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/user', userRoutes);
app.use('/questions', questionRoutes);

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log('Server is running on ', PORT);
});
