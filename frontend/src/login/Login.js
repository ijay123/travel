import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/CustomSpinner";

import { toast } from "react-toastify";
import { loginUserAction } from "../redux/action/user";
import {

  LOGIN_USER_CLEAR_ERROR,
} from "../redux/constants/user";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const {
    loggedInUser: { user, success, error, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
  ? JSON.parse(localStorage.getItem("taskUserInfo"))
  : null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Handles form data onChange event
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      toast.success(`You have successfully logged in, ${userInfoFromLocalStorage?.data?.username}`);
      // Directly use navigate function for redirection without setTimeout
      // if immediate redirection is desired. Otherwise, keep setTimeout for delayed redirection.
      setTimeout(() => {
        navigate("/home");
      }, 3000); // Adjust delay here as needed
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: LOGIN_USER_CLEAR_ERROR });
      }, 3000);
    }
  }, [success, user?.data?.username, error, dispatch, navigate, userInfoFromLocalStorage, user]);
  // Submits the signup form to create a new user in the database
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      loginUserAction({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <div className="flex min-h-[100vh]">
      <div>
        <img src="/assets/travellogin.jpg" alt="" />
      </div>
      <div className="pt-[200px]">
        <form className="px-[150px] flex flex-col gap-[50px]">
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
              onClick={submitHandler}
              className="border rounded-[10px] h-[50px] pl-[10px] outline-none bg-[green] text-[white]"
            >
              Login
            </button>
          )}
          <p>
            Dont't have an account? <Link to={"/"}>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
