import TravelModel from "../../model/travel/Travel.js";
import httpStatus from "http-status";

const createTravel = async (req, res) => {
  //collect the data from req body
  const data = req.body;
  const userId = req.user.id;

  const detailExist = await TravelModel.findOne({
    departureDate: data.departureDate,
    departureTime: data.departureTime,
    userId: data.userId,
  });
  console.log(detailExist);
  if (detailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message:
        "You cannot have the same date and time for your next destination",
    });
    return;
  }

  const createdTravel = await TravelModel.create({
    destination: data.destination,
    travelType: data.travelType,
    departureTime: data.departureTime,
    departureDate: data.departureDate,
    userId: data.userId,
  });

  const newTravel = await TravelModel.findOne({
    _id: createdTravel._id,
  }).populate("userId");

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: newTravel,
  });
};

const getTravels = async (req, res) => {
  console.log("params", req.params);
  console.log("query", req.query);
  const getTravel = await TravelModel.find({ userId: req.user.id }).populate(
    "userId"
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: getTravel,
  });
};

// updated Task

const updateTravel = async (req, res) => {
  const { destination, travelType, departureTime, departureDate } = req.body;
  const { id } = req.params;

  try {
    const updatedTravel = await TravelModel.findByIdAndUpdate(
      id,
      { destination, travelType, departureTime, departureDate },
      { new: true }
    );

    if (!updatedTravel) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Booking not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: updatedTravel,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "An error occurred while updating your booking",
      error: error.message,
    });
  }
};

const deleteTravel = async (req, res) => {
  const { id } = req.params;
  const foundTravel = await TravelModel.findOne({ _id: id });
  if (!foundTravel) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Booking not found",
    });
    return;
  }

  await TravelModel.findByIdAndDelete({ _id: id });

  res.status(httpStatus.OK).json({
    status: "success",
    data: `Booking with ID ${id} is deleted`,
  });
};

export { createTravel, getTravels, updateTravel, deleteTravel };
