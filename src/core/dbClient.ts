import {
  Address as DBAddress,
  Agency as DBAgency,
  Card as DBCard,
  Prisma as DBClientType,
  PrismaClient,
  Role as DBRole,
  User as DBUser
} from "@prisma/client";

export const DBClient = new PrismaClient();

export {
  DBClientType,
  DBAddress,
  DBAgency,
  DBCard,
  DBUser,
  DBRole
};
