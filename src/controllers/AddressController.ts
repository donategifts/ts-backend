import {controller, httpGet, httpPost, next, request, requestParam, response} from "inversify-express-utils";

import { Address } from "@prisma/client";
import {inject} from "inversify";
import {TYPES} from "../core/types";
import { AddressService } from "../services/AddressService";
import {celebrate} from "celebrate";
import {validateAuthHeader, validateToken} from "../core/validations/AuthenticationValidator";
import * as express from "express";
import {AddressCreateRequest} from "../connectors/addresses/entities/Address";
import {validateCreateAddress} from "../core/validations/AddressValidator";

@controller("/address")
export class AddressController {

  constructor(@inject(TYPES.AddressServiceType) private addressService: AddressService) {}

  @httpGet("/:id")
  getAddress(@requestParam("id") id: string): Promise<Address | null> {
    console.log(id)
    return this.addressService.getById(id)
  }

  @httpPost("/", celebrate({...validateAuthHeader, ...validateCreateAddress}), validateToken)
  createAddress(
    @request() req: express.Request & { user: { [key: string]: string } },
    @response() _res: express.Response,
    @next() _next: express.NextFunction,
  ): Promise<Address | null> {
    const {street, streetNumber, additionalAddress, zipcode, city, country, state, agencyId, firstName, lastName} = req.body;
    const addressCreateRequest: AddressCreateRequest = {
      street,
      streetNumber,
      additionalAddress,
      zipcode,
      city,
      country,
      state,
      agencyId,
      firstName,
      lastName,
    };
    return this.addressService.create(addressCreateRequest)
  }
}
