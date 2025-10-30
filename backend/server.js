import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors())
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/user',userRoutes)

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
})