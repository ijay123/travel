import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/CustomSpinner";
import { toast } from "react-toastify";
import { createUserAction } from "../redux/action/user";
import {
  CREATE_USER_CLEAR_ERROR,
  CREATE_USER_RESET,
} from "../redux/constants/user";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    createdUser: { user, success, error, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("travelUserInfo")
    ? JSON.parse(localStorage.getItem("travelUserInfo"))
    : null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  });
  // Handles form data onChange event
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (success) {
      toast.success(
        `Welcome, you have succesfully signedup, ${userInfoFromLocalStorage?.data?.username}`
      );
      setTimeout(() => {
        dispatch({ type: CREATE_USER_RESET });
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: CREATE_USER_CLEAR_ERROR });
      }, 3000);
    }
  }, [
    success,
    
    error,
    dispatch,
    userInfoFromLocalStorage?.data?.username,
  ]);
  // Submits the signup form to create a new user in the database
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createUserAction(formData));
  };

  return (
    <div className="flex min-h-[100vh]">
      <div>
        <img src="/assets/travellogin.jpg" alt="" />
      </div>
      <div className="pt-[100px]">
        <form className="px-[150px] flex flex-col gap-[50px]" onSubmit={submitHandler}>
          <div>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              onChange={handleOnChange}
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none"
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              onChange={handleOnChange}
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none"
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none"
            />
          </div>
          <div>
            <p>Gender</p>
            <select
              name="gender"
              onChange={handleOnChange}
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <p>password</p>
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none"
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <button
             type="submit"
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none bg-[green] text-[white]"
            >
              Signup
            </button>
          )}
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
