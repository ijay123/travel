import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/CustomSpinner";
import { toast } from "react-toastify";
import { createTravelAction } from "../redux/action/travel";
import { useNavigate } from "react-router-dom";
import {
  CREATE_TRAVEL_CLEAR_ERROR,
  CREATE_TRAVEL_RESET,
  CREATE_TRAVEL_REQUEST,
} from "../redux/constants/travel";

const Home = () => {
  const dispatch = useDispatch();

  const {
    createdTravel: { success, error, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("travelUserInfo")
    ? JSON.parse(localStorage.getItem("travelUserInfo"))
    : null;

  const [formData, setFormData] = useState({
    destination: "",
    travelType: "",
    departureTime: "",
    departureDate: "",
    userId: userInfoFromLocalStorage.data?._id,
  });
  // Handles form data onChange event
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      toast.success(`You have successfully added task`);

      // Directly use navigate function for redirection without setTimeout
      // if immediate redirection is desired. Otherwise, keep setTimeout for delayed redirection.
      setTimeout(() => {
        dispatch({ type: CREATE_TRAVEL_RESET });
       
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: CREATE_TRAVEL_CLEAR_ERROR });
      }, 3000);
    }
  }, [success, error, dispatch, navigate]);
  // Submits the signup form to create a new user in the database
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createTravelAction(formData));
    dispatch({ type: CREATE_TRAVEL_REQUEST });
  };

  return (
    <div>
      <div className="bg-[url('/Users/ijeoma/Documents/travel-times/frontend/public/assets/background.png')] bg-no-repeat w-[100%] bg-cover bg-center h-[70vh] text-white">
        <p className="w-[690px] text-[60px] pt-[200px] pl-[200px]">
          No matter where you’re going to, we’ll take you there
        </p>
      </div>
      <div>
        <form
          className="flex bg-[blur] bg-[grey]  gap-[50px] text-[white]"
          onSubmit={submitHandler}
        >
          <div>
            <p>Destination:</p>
            <select
              className="bg-transparent outline-none"
              name="destination"
              onChange={handleOnChange}
            >
              <option value="">Select Destination</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="China">China</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="South Africa">South Africa</option>
            </select>
          </div>
          <div>
            <p>Travel Type:</p>
            <select className="bg-transparent" name="travelType" onChange={handleOnChange}>
              <option value="">Select Travel Type</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business Class</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
          <div>
            <p>Departure Date:</p>

            <input
              type="date"
              className="bg-transparent"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <p>Departure Time:</p>

            <input
              type="time"
              className="bg-transparent"
              name="departureTime"
         
              onChange={handleOnChange}
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="border bg-red-400">
              Add Trip
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
