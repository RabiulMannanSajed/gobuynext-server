import { upsertUserLead } from "./userLead.service.js";

export const createOrUpdateUserLead = async (req, res) => {
  try {
    const result = await upsertUserLead(req.body);

    res.status(200).json({
      success: true,
      message: "UserLead processed successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to process user lead",
    });
  }
};
