export default class CustomerDTO {
  private _CustomerName: string;
  private _CustomerEmail: string;
  private _CustomerMobile: number;
  private _CustomerWork: string;
  private _CustomerNic: string;
  private _CustomerGender: string;
  private _CustomerRole: string;
  private _CustomerHiredDate: string;

  get CustomerName(): string {
    return this._CustomerName;
  }

  set CustomerName(value: string) {
    this._CustomerName = value;
  }

  get CustomerEmail(): string {
    return this._CustomerEmail;
  }

  set CustomerEmail(value: string) {
    this._CustomerEmail = value;
  }

  get CustomerMobile(): number {
    return this._CustomerMobile;
  }

  set CustomerMobile(value: number) {
    this._CustomerMobile = value;
  }

  get CustomerWork(): string {
    return this._CustomerWork;
  }

  set CustomerWork(value: string) {
    this._CustomerWork = value;
  }

  get CustomerNic(): string {
    return this._CustomerNic;
  }

  set CustomerNic(value: string) {
    this._CustomerNic = value;
  }

  get CustomerGender(): string {
    return this._CustomerGender;
  }

  set CustomerGender(value: string) {
    this._CustomerGender = value;
  }

  get CustomerRole(): string {
    return this._CustomerRole;
  }

  set CustomerRole(value: string) {
    this._CustomerRole = value;
  }

  get CustomerHiredDate(): string {
    return this._CustomerHiredDate;
  }

  set CustomerHiredDate(value: string) {
    this._CustomerHiredDate = value;
  }


    constructor(CustomerName: string, CustomerEmail: string, CustomerMobile: number, CustomerWork: string, CustomerNic: string, CustomerGender: string, CustomerRole: string, CustomerHiredDate: string) {
    this._CustomerName = CustomerName;
    this._CustomerEmail = CustomerEmail;
    this._CustomerMobile = CustomerMobile;
    this._CustomerWork = CustomerWork;
    this._CustomerNic = CustomerNic;
    this._CustomerGender = CustomerGender;
    this._CustomerRole = CustomerRole;
    this._CustomerHiredDate = CustomerHiredDate;
  }


}
