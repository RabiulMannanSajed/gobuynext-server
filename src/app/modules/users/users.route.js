import { Router } from "express";
import {
  createUsers,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "./users.controller.js";

const route = Router();

route.post("/create-users", createUsers);

route.get("/get-all-users", getAllUsers);

route.get("/get-user-by-id/:id", getUserById);

route.get("/get-user-by-email/:email", getUserByEmail);

route.patch("/update-user-by-id/:id", updateUserById);

route.delete("/delete-user-by-id/:id", deleteUserById);

export const UserRoute = route;
