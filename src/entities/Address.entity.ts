export class Address {
  public readonly id: string;

  public city: string;

  public cep?: string;

  public state: string;

  public square: string;

  constructor(props: Omit<Address, 'id'>) {
    Object.assign(this, props);
  }
}
