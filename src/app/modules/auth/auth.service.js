import { User } from "../users/users.model.js";

export const LoginUser = async (payload) => {
  const { email, password } = payload;

  // 🔎 Basic validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // 🔎 Find user
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 🔎 Check if deleted
  if (user.isDelete) {
    throw new Error("This account is deleted");
  }

  // 🔎 Check password
  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};
