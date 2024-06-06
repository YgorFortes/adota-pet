type propsAddress = {
  id?: string;

  city: string;

  cep?: string;

  state: string;

  street: string;

  complement?: string;

  neighborhood: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
};

export class Address {
  public readonly id?: string;

  public city: string;

  public cep?: string;

  public state: string;

  public street: string;

  public complement?: string;

  public neighborhood: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;

  constructor(props: propsAddress) {
    this.id = props.id;
    this.city = props.city;
    this.cep = props.cep;
    this.state = props.state;
    this.street = props.street;
    this.neighborhood = props.neighborhood;
    this.complement = props.complement;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
