import {
  createUseIntoDB,
  deleteUserByIdFromDB,
  getAllUsersFromDB,
  getUserByEmailFromDB,
  getUserByIdFromDB,
  updateUserByIdIntoDB,
} from "./users.services.js";

export const createUsers = async (req, res) => {
  try {
    const result = await createUseIntoDB(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersFromDB();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const result = await getUserByIdFromDB(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const result = await updateUserByIdIntoDB(req.params.id, req.body);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUserByEmail = async (req, res) => {
  console.log("email", req.params);
  try {
    const { email } = req.params; // get email from URL
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await getUserByEmailFromDB(email);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const result = await deleteUserByIdFromDB(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: err.message });
  }
};
