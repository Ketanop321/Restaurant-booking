import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { dbConnection } from "./database/dbConnection.js"
import { errorMiddleware } from "./error/error.js"
import reservationRouter from './routes/reservationRoute.js'

const app = express();

// Load environmental variables
dotenv.config({ path: "./config/config.env" });

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,   
  methods: ["POST"], // only post method is being used in this project
  credentials: true  
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use reservation route
app.use('/api/v1/reservation', reservationRouter);

//Default Route
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})


// Initialize database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;