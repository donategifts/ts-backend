import {DBAgency} from "../../../core/dbClient";
import {Address} from "../../addresses/entities/Address";

export type Agency = DBAgency;
export type AgencyCreateRequest = {
  name: string;
  bio?: string;
  createdBy: string;
  phone: string;
  website?: string;
  address?: Address;
};
