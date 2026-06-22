import { LoginUser } from "./auth.service.js";

export const createLoginUser = async (req, res) => {
  try {
    const result = await LoginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};
