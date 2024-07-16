type propsToken = {
  id?: string;

  token: string;
};

export class TokenInvalid {
  public readonly id?: string;
  public readonly token: string;

  constructor(propsToken: propsToken) {
    this.id = propsToken.id;
    this.token = propsToken.token;
  }
}
