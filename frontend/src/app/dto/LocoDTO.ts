export default class LocoDTO {
  private _locoNumber: string;
  private _locoCatId: string;
  private _locoPower: number;
  private _locoAvailability: string;
  private _locoMileage: number;
  private _userNic: string;
  private _locoDate: string;
  private _locoOil: number;
  private _locoFuel: number;
  private _locoWater: number;
  private _locoMainGen: string;
  private _locoTracMot: string;
  private _locoVBreak: string;
  private _locoDBreak: string;
  private _locoNote: string;
  private _image: string[] = [];
  private _locoMotors: any[] = [];
  constructor(locoNumber?: string, locoCatId?: string, locoPower?: number, locoMileage?: number,  locoAvailability?: string, userNic?: string, locoDate?: string, locoOil?: number, locoFuel?: number, locoWater?: number, locoMainGen?: string, locoTracMot?: string, locoVBreak?: string, locoDBreak?: string, locoNote?: string, image?: string[], locoMotors?: any) {
    this._locoNumber = locoNumber;
    this._locoCatId = locoCatId;
    this._locoPower = locoPower;
    this._locoMileage =  locoMileage;
    this._locoAvailability = locoAvailability;
    this._userNic = userNic;
    this._locoDate = locoDate;
    this._locoOil = locoOil;
    this._locoFuel = locoFuel;
    this._locoWater = locoWater;
    this._locoMainGen = locoMainGen;
    this._locoTracMot = locoTracMot;
    this._locoVBreak = locoVBreak;
    this._locoDBreak = locoDBreak;
    this._locoNote = locoNote;
    this._image = image;
    this._locoMotors = locoMotors;
  }


  get locoCatId(): string {
    return this._locoCatId;
  }

  set locoCatId(value: string) {
    this._locoCatId = value;
  }

  get locoPower(): number {
    return this._locoPower;
  }

  set locoPower(value: number) {
    this._locoPower = value;
  }

  get locoMileage(): number{
    return  this._locoMileage;
  }
  set   locoMileage(value: number){
    this._locoMileage = value;
  }

  get locoNumber(): string {
    return this._locoNumber;
  }

  set locoNumber(value: string) {
    this._locoNumber = value;
  }

  get locoAvailability(): string {
    return this._locoAvailability;
  }

  set locoAvailability(value: string) {
    this._locoAvailability = value;
  }

  get userNic(): string {
    return this._userNic;
  }

  set userNic(value: string) {
    this._userNic = value;
  }

  get locoDate(): string {
    return this._locoDate;
  }

  set locoDate(value: string) {
    this._locoDate = value;
  }

  get locoOil(): number {
    return this._locoOil;
  }

  set locoOil(value: number) {
    this._locoOil = value;
  }

  get locoFuel(): number {
    return this._locoFuel;
  }

  set locoFuel(value: number) {
    this._locoFuel = value;
  }

  get locoWater(): number {
    return this._locoWater;
  }

  set locoWater(value: number) {
    this._locoWater = value;
  }

  get locoMainGen(): string {
    return this._locoMainGen;
  }

  set locoMainGen(value: string) {
    this._locoMainGen = value;
  }

  get locoTracMot(): string {
    return this._locoTracMot;
  }

  set locoTracMot(value: string) {
    this._locoTracMot = value;
  }

  get locoVBreak(): string {
    return this._locoVBreak;
  }

  set locoVBreak(value: string) {
    this._locoVBreak = value;
  }

  get locoDBreak(): string {
    return this._locoDBreak;
  }

  set locoDBreak(value: string) {
    this._locoDBreak = value;
  }

  get locoNote(): string {
    return this._locoNote;
  }

  set locoNote(value: string) {
    this._locoNote = value;
  }
  get image(): string[] {
    return this._image;
  }

  set image(value: string[] ) {
    this._image = value;
  }
  get locoMotors(): string[] {
    return this._locoMotors;
  }

  set locoMotors(value: string[] ) {
    this._locoMotors = value;
  }
}
