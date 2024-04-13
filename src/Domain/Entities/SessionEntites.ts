import { BaseEntities } from "./BaseEntites";
class SessionLogin {
  private _userId: string;
  private _email: string;
  private _name: string;
  private _username: string;
  private _jwttoken: string;
  private _refreshToken: string;
  private _expireRefreshToken: string;
  private _expireDate: Date;
  private _deviceId: string;
  private _ipAddress: string;
  private _dbName: string;

  public get userId(): string {
    return this._userId;
  }

  public set userId(userId: string) {
    this._userId = userId;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }

  public get jwttoken(): string {
    return this._jwttoken;
  }

  public set jwttoken(jwttoken: string) {
    this._jwttoken = jwttoken;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  public get expireRefreshToken(): string {
    return this._expireRefreshToken;
  }

  public set expireRefreshToken(expireRefreshToken: string) {
    this._expireRefreshToken = expireRefreshToken;
  }

  public get expireDate(): Date {
    return this._expireDate;
  }

  public set expireDate(expireDate: Date) {
    this._expireDate = expireDate;
  }

  public get deviceId(): string {
    return this._deviceId;
  }

  public set deviceId(deviceId: string) {
    this._deviceId = deviceId;
  }

  public get ipAddress(): string {
    return this._ipAddress;
  }

  public set ipAddress(ipAddress: string) {
    this._ipAddress = ipAddress;
  }

  public get dbName(): string {
    return this._dbName;
  }

  public set dbName(dbName: string) {
    this._dbName = dbName;
  }

  constructor(
    userId: string,
    email: string,
    name: string,
    username: string,
    jwttoken: string,
    refreshToken: string,
    expireRefreshToken: string,
    expireDate: Date,
    deviceId: string,
    ipAddress: string,
    dbName: string
  ) {
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.username = username;
    this.jwttoken = jwttoken;
    this.refreshToken = refreshToken;
    this.expireRefreshToken = expireRefreshToken;
    this.expireDate = expireDate;
    this.deviceId = deviceId;
    this.ipAddress = ipAddress;
    this.dbName = dbName;
  }
}

class SessionWithBase extends BaseEntities {
  constructor(session: SessionLogin) {
    super();
    Object.assign(this, session);
  }
}

export { SessionLogin, SessionWithBase };
