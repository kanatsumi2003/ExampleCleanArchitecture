import { Request } from "express";
import { User } from "../../../../Domain/Entities/UserEntites";

export interface RequestWithUser extends Request{
  user?: any;
}

