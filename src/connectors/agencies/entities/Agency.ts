import { Agency as PrismaAgency } from "@prisma/client";
import { Address } from "../../addresses/entities/Address";

export type Agency = PrismaAgency;
export type AgencyCreateRequest = {
  name: string;
  bio?: string;
  createdBy: string;
  phone: string;
  website?: string;
  address: Address;
};
