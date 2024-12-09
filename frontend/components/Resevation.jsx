// Importing required dependencies
import React from "react";  // React for building UI components
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
    e.preventDefault();  // Prevents the default form submit behavior (refreshing the page)

    try {
      // Making a POST request to the backend to save reservation data
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",  // The backend API endpoint for reservation
        { firstName, lastName, email, phone, date, time },  // The form data to send to the backend
        {
          headers: {
            "Content-Type": "application/json",  // The request content type (JSON)
          },
          withCredentials: true,  // Indicates if cross-site Access-Control requests should be made using credentials
        }
      );

      // If the reservation is successful, show success toast and reset form data
      toast.success(data.message);  // Show a success message
      setFirstName("");  // Reset first name field
      setLastName("");  // Reset last name field
      setPhone(0);  // Reset phone number field
      setEmail("");  // Reset email field
      setTime("");  // Reset time field
      setDate("");  // Reset date field

      // Navigate the user to a success page after the reservation is complete
      navigate("/success");
    } catch (error) {
      // If an error occurs, show an error toast
      toast.error(error.response.data.message);  // Show error message from the backend
    }
  };

  // JSX markup for the Reservation component
  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" /> {/* Display an image related to reservation */}
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>  {/* Title for the reservation section */}
            <p>For Further Questions, Please Call</p>  {/* Optional instruction or message */}
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
                  value={lastName}  // Bind the value to the lastName state variable
                  onChange={(e) => setLastName(e.target.value)}  // Update the state whenever the input changes
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}  // Bind the value to the date state variable
                  onChange={(e) => setDate(e.target.value)}  // Update the state whenever the input changes
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}  // Bind the value to the time state variable
                  onChange={(e) => setTime(e.target.value)}  // Update the state whenever the input changes
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
                  value={phone}  // Bind the value to the phone state variable
                  onChange={(e) => setPhone(e.target.value)}  // Update the state whenever the input changes
                />
              </div>
              {/* Submit button */}
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

// Export the component so it can be used in other parts of the application
export default Reservation;
