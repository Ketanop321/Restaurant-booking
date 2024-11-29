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
  methods: ["POST"],
  credentials: true  
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use reservation route
app.use('/api/v1/reservation', reservationRouter);

// Initialize database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;