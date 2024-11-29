//yeh ek send_reservation function hai jo client se bheje data ko
//req.body se extract krega usek baad validate krega agar sare data
//fields correct honge to usko aage wo database me save kr dega
//or yeh sara process reservationRoute.js me hota hai jaha pr 
//router.post("/send",send_reservation) send_reservation call ho ja rha hai
//call hote hi send_reservation ke andar ka sara function execute hojata hai
//or last me frontend ko success ya error ka msg bhejga 

import { ErrorHandler } from "../error/error.js";   
import { Reservation } from "../models/reservationSchema.js";

const send_reservation = async (req, res, next) => {
  // Extract data from request body
  const { firstName, lastName, email, date, time, phone } = req.body;

  // If any of the required fields are missing, return an error using ErrorHandler
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    // Create a new reservation in the database
    await Reservation.create({ firstName, lastName, email, date, time, phone });

    // If successful, send the success response
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });

  } catch (error) {
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // For any other errors, pass it to the next error handler
    return next(error);
  }
};

export default send_reservation;
