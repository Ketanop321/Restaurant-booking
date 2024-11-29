import mongoose from "mongoose";
import validator from "validator";


const reservationSchema =  new mongoose.Schema({

   firstName:{
      type: String,
      required: true,
      minLength: [3, "First name must contain atleast 3 character."],
      maxLength: [30, "First name cannot exceed 30 character"],

   },

   lastName: {
      type: String,
      required: true,
      minLength: [3,"Last name must contain atleast 3 character"],
      maxLength: [30, "Last name cannot exceed 30 character"],

   },

   date: {
      type: String,
      required: true,

   },
   time: {
      type: String,
      required: true,
   },

   email: {
      type: String,
      required: true,
      validate: [validator.isEmail,"Provide a valid email"],
   },
   phone: {
      type: String,
      required: true,
      minLength: [10,"phone number must contain 10 digits"],
      maxLength: [10,"Phone number must contain 10 digits"],
   },
});


export const Reservation = mongoose.model("Reservation",reservationSchema)