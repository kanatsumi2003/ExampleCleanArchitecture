import { BaseEntities } from "./BaseEntites";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";

class User {
  private _fullname: string;
  private _email: string;
  private _username: string;
  private _password: string;
  private _phoneNumber: string;
  private _role_id: Types.ObjectId;
  private _imageUser: string;
  private _emailConfirmed: boolean;
  private _phoneConfirmed: boolean;
  private _emailCode: string;
  private _enable2FA: boolean;
  private _twoFASecret: string;

  public get fullname(): string {
    return this._fullname;
  }

  public set fullname(fullname: string) {
    this._fullname = fullname;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  public get role_id(): Types.ObjectId {
    return this._role_id;
  }

  public set role_id(role_id: Types.ObjectId) {
    this._role_id = role_id;
  }

  public get imageUser(): string {
    return this._imageUser;
  }

  public set imageUser(imageUser: string) {
    this._imageUser = imageUser;
  }

  public get emailConfirmed(): boolean {
    return this._emailConfirmed;
  }

  public set emailConfirmed(emailConfirmed: boolean) {
    this._emailConfirmed = emailConfirmed;
  }

  public get phoneConfirmed(): boolean {
    return this._phoneConfirmed;
  }

  public set phoneConfirmed(phoneConfirmed: boolean) {
    this._phoneConfirmed = phoneConfirmed;
  }

  public get emailCode(): string {
    return this._emailCode;
  }

  public set emailCode(emailCode: string) {
    this._emailCode = emailCode;
  }

  public get enable2FA(): boolean {
    return this._enable2FA;
  }

  public set enable2FA(enable2FA: boolean) {
    this._enable2FA = enable2FA;
  }

  public get twoFASecret(): string {
    return this._twoFASecret;
  }

  public set twoFASecret(twoFASecret: string) {
    this._twoFASecret = twoFASecret;
  }

  constructor(
    fullname: string,
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    role_id: Types.ObjectId,
    imageUser: string
  ) {
    this.fullname = fullname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.role_id = role_id;
    this.imageUser = imageUser;
    this.emailConfirmed = false;
    this.phoneConfirmed = false;
    this.emailCode = Math.random().toString(36).substring(2, 5);
    this.enable2FA = false;
    this.twoFASecret = speakeasy.generateSecret({ length: 20 }).base32;
    if (!mongoose.Types.ObjectId.isValid(role_id)) {
      this.role_id = new mongoose.Types.ObjectId(role_id); //convert role_id from string or another data types into mongoose ObjectId
    } else {
      this.role_id = role_id;
    }
  }

  async isCorrectPassword(plainPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
      return false;
    }
  }
}

class UserWithBase extends BaseEntities {
  constructor(user: User) {
    super();
    Object.assign(this, user);
  }
  async isCorrectPassword(plainPassword: string): Promise<Boolean> {
    try {
      return await bcrypt.compare(plainPassword, (this as any).password);
    } catch (error) {
      return false;
    }
  }
}

export { User, UserWithBase };
