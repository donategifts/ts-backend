export class AuthenticationError extends Error {

  public status: number;
  public code: string;
  constructor() {
    super("Auth token invalid");
    this.status = 401;
    this.code = "auth_token_invalid";
  }

}
