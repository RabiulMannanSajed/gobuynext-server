import { Router } from "express";
import { createOrUpdateUserLead } from "./userLead.controller.js";

const route = Router();

route.post("/user-lead", createOrUpdateUserLead);
