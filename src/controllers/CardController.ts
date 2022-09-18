import {controller, httpPost, interfaces, next, request, response} from "inversify-express-utils";
import {celebrate} from "celebrate";
import * as express from "express";
import {CardService} from "../services/CardService";
import {validateAuthHeader, validateToken} from "../core/validations/AuthenticationValidator";
import {Card} from "../connectors/cards/entities/Card";
import {validateCreateChildCard} from "../core/validations/CardValidator";
import {inject} from "inversify";
import {TYPES} from "../core/types";

@controller("/card/child")
export class CardController implements interfaces.Controller {

  constructor(@inject(TYPES.CardServiceType) private cardService: CardService) {}

  @httpPost("/", celebrate({...validateAuthHeader, ...validateCreateChildCard}), validateToken)
  private async createCard(
    @request() req: express.Request & { user: { [key: string]: string } },
    @response() _res: express.Response,
    @next() _next: express.NextFunction,
  ): Promise<Card> {
    return this.cardService.create(req.body);
  }

}
