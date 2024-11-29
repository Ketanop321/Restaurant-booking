import express from "express";
import send_reservation from "../controller/reservation.js";

const router = express.Router();
//Route ke andar send_reservation function call hota hai.
// Yeh function request body (req.body) se data nikalta hai.
router.post("/send", send_reservation);

export default router;



//Route Receives Data:
//POST route (e.g., /send) matches the incoming request and  
//calls the appropriate controller function.
//. Server apne hi end par kaam karta hai—client ko bas 
//result bhejta hai (success ya error message).
 