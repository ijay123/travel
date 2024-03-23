import User from "../../model/user/user.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtToken } from "../../util/generateToken.js";

const createUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //import the db model and create the user
  //User.findOne({_id:req.params.id})
  //User.findById(req.params.id)

  const emailExist = await User.findOne({
    email: data.email,
  });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with email already exist",
    });
    return;
  }

  //hass password
  const saltRound = 10;
  const hash = await bcrypt.hash(data.password, saltRound);

  const createdUser = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    password: hash, //hash the password using bcrycpt
    gender: data.gender,
    email: data.email,
    avatar:
      data.gender === "Male"
        ? "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1666096504.1702379919&semt=sph"
        : data.gender === "Female"
        ? "https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
        : "defaultAvatar.jpg",
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdUser,
  });
};

const loginUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //check if user is registered
  const userExist = await User.findOne({
    email: data.email,
  });

  if (!userExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "No record found",
    });
    return;
  }
  const isConfirmed = await ComparePassword(data.password, userExist.password);

  //check that password is correct
  if (!isConfirmed) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Credential not correct",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: userExist,
    token: jwtToken(userExist._id, userExist.email),
  });
};

async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

const getUsers = async (req, res) => {
  const getUser = await User.find({});

  res.status(httpStatus.OK).json({
    status: "success",
    data: getUser,
  });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, avatar, password } = req.body;
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message:
        "User with email already exist. Please, provide a unique email",
    });
    return;
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      password: password,
    },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(id);

  res.status(httpStatus.OK).json({
    status: "success",
    data: `User with ID ${id} is deleted`,
  });
};

export { createUser, loginUser, getUsers, updateUser, deleteUser };
