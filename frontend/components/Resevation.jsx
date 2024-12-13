 import React from "react";   
import { HiOutlineArrowNarrowRight } from "react-icons/hi"; // Importing an icon for the button
import axios from "axios";  // Axios for making HTTP requests
import { useState } from "react";  // React hook to manage local state
import toast from "react-hot-toast";  // For displaying success and error messages as toast notifications
import { useNavigate } from "react-router-dom";  // React Router hook for navigation after reservation

// Reservation functional component
const Reservation = () => {
  // State variables to hold form data
  const [firstName, setFirstName] = useState("");  // To store the user's first name
  const [lastName, setLastName] = useState("");  // To store the user's last name
  const [email, setEmail] = useState("");  // To store the user's email
  const [date, setDate] = useState("");  // To store the reservation date
  const [time, setTime] = useState("");  // To store the reservation time
  const [phone, setPhone] = useState(0);  // To store the user's phone number (initially 0)
  const navigate = useNavigate();  // This will be used to navigate to another page after successful reservation

  // Handle reservation form submission
  const handleReservation = async (e) => {
  e.preventDefault();  // Prevent default form submit behavior

  setLoading(true);  // Set loading state to true while the request is being made

  try {
    // Make POST request to backend API
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/reservation/send",  // API endpoint
      { firstName, lastName, email, phone, date, time },  // Form data
      {
        headers: {
          "Content-Type": "application/json",  // Set the content type to JSON
        },
        withCredentials: true,  // Ensure credentials are included in requests
      }
    );

    // If request is successful, show success toast
    toast.success(data.message);
    // Reset form fields after success
    setFirstName("");
    setLastName("");
    setPhone(0);
    setEmail("");
    setTime("");
    setDate("");
    // Redirect to success page
    navigate("/success");

  } catch (error) {
    console.error('Reservation failed:', error);

    // Check for network errors (AxiosError)
    if (error.code === 'ERR_NETWORK') {
      toast.error('Network error: Unable to reach the server. Please check your connection.');
    } else if (!error.response) {
      toast.error('An unexpected error occurred. Please try again later.');
    } else {
      // Display error message from the backend
      toast.error(error.response?.data?.message || 'Reservation failed!');
    }
  } finally {
    setLoading(false);  // Reset loading state after request completes
  }
};


  // JSX markup for the Reservation component
  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>   
            <p>For Further Questions, Please Call</p>  
            <form>
              {/* Form fields for user to input reservation details */}
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}  // Bind the value to the firstName state variable
                  onChange={(e) => setFirstName(e.target.value)}  // Update the state whenever the input changes
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}   
                  onChange={(e) => setLastName(e.target.value)}   
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}   
                  onChange={(e) => setDate(e.target.value)}  
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}  
                  onChange={(e) => setTime(e.target.value)}   
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"  // Adding a custom class for email input styling
                  value={email}  // Bind the value to the email state variable
                  onChange={(e) => setEmail(e.target.value)}  // Update the state whenever the input changes
                />
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}   
                  onChange={(e) => setPhone(e.target.value)}  // Update the state whenever the input changes
                />
              </div>
              {/* Submit button  */}
              {/* Jab user form submit karta hai, toh handleReservation function call hota hai.*/}
              <button type="submit" onClick={handleReservation}>
                RESERVE NOW{" "}
                <span>
                  <HiOutlineArrowNarrowRight />  {/* Display the arrow icon inside the button */}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

 export default Reservation;
