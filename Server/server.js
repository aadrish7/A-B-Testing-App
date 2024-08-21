const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel'); 
const AdminVersion = require('./models/adminModel');
const adminRoutes = require('./routers/adminRouter');
const userRoutes = require('./routers/userRouter');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("\x1b[34m%s\x1b[0m", "DB connected");
    app.listen(PORT, () =>
      console.log("\x1b[33m%s\x1b[0m", `Listening at port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("\x1b[31m%s\x1b[0m", err);
  });


  app.use('/api/admin', adminRoutes);
  app.use('/api/user', userRoutes);