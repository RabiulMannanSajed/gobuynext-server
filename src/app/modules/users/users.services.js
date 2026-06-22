import { User } from "./users.model.js";

export const createUseIntoDB = async (data) => {
  const { email, phone } = data;

  // 🔎 Check existing user by email
  if (email) {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("User already exists with this email");
    }
  }

  // 🔎 Check existing user by phone
  const existingPhone = await User.findOne({ phone });

  if (existingPhone) {
    throw new Error("User already exists with this phone number");
  }

  // ✅ Create user
  const userData = new User(data);

  const result = await userData.save();

  return result;
};

export const getAllUsersFromDB = async () => {
  // check only Admin can see all users
  return await User.find({ isDelete: false });
};

export const getUserByIdFromDB = async (id) => {
  return await User.findOne({ _id: id, isDelete: false });
};

export const updateUserByIdIntoDB = async (id, data) => {
  return await User.findOneAndUpdate({ _id: id, isDelete: false }, data, {
    new: true,
  });
};

export const getUserByEmailFromDB = async (email) => {
  return await User.findOne({ email: email, isDelete: false });
};

export const deleteUserByIdFromDB = async (id) => {
  return await User.findOneAndUpdate(
    { _id: id, isDelete: false },
    { isDelete: true },
    { new: true },
  );
};
