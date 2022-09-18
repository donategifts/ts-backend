import {DBAddress} from "../../../core/dbClient";

export type Address = DBAddress;
export type AddressCreateRequest = {
  street: string
  streetNumber: string
  additionalAddress: string | null
  zipcode: string
  city: string
  country: string
  state: string
  agencyId: string
  cardId?: string
}
