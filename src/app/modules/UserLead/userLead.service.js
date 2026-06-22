import { UserLead } from "./userLead.model.js";

export const upsertUserLead = async (payload) => {
  const { phone, name, district, area, email } = payload;

  const existingLead = await UserLead.findOne({ phone });

  if (existingLead) {
    // update existing lead
    existingLead.name = name;
    existingLead.district = district;
    existingLead.area = area;
    existingLead.email = email;

    await existingLead.save();

    return existingLead;
  }

  // create new lead
  const newLead = await UserLead.create({
    phone,
    name,
    district,
    area,
    email,
  });

  return newLead;
};
