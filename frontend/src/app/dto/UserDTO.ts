export default class UserDTO {
  get userEmail(): string {
    return this._userEmail;
  }

  set userEmail(value: string) {
    this._userEmail = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get userWorks(): string {
    return this._userWorks;
  }

  set userWorks(value: string) {
    this._userWorks = value;
  }

  get userNic(): string {
    return this._userNic;
  }

  set userNic(value: string) {
    this._userNic = value;
  }

  get userMobile(): string {
    return this._userMobile;
  }

  set userMobile(value: string) {
    this._userMobile = value;
  }
  get userRole(): string{
    return this._userRole;
  }
  set userRole(value: string){
    this._userRole = value;
  }

  get userPassword(): string {
    return this._userPassword;
  }

  set userPassword(value: string) {
    this._userPassword = value;
  }
  constructor(userEmail?: string, userName?: string, userWorks?: string, userNic?: string, userMobile?: string, userRole?: string, userPassword?: string) {
    this._userEmail = userEmail;
    this._userName = userName;
    this._userWorks = userWorks;
    this._userNic = userNic;
    this._userMobile = userMobile;
    this._userRole =  userRole;
    this._userPassword = userPassword;
  }
 private _userEmail: string;
 private _userName: string;
 private _userWorks: string;
  private _userNic: string;
  private _userMobile: string;
  private _userRole: string;
  private _userPassword: string;
}
