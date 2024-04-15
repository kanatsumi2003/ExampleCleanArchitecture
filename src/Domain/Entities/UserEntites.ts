import { ObjectId } from 'mongodb';
import { BaseEntities } from "./BaseEntites";
import mongoose, { Document, Mongoose, Types } from "mongoose";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";

class User{
  private id: mongoose.Types.ObjectId;
  private fullname: string;
  private email: string;
  private username: string;
  private password: string;
  private phoneNumber: string;
  private role_id: Types.ObjectId;
  private imageUser: string;
  private emailConfirmed: boolean;
  private phoneConfirmed: boolean;
  private emailCode: string;
  private enable2FA: boolean;
  private twoFASecret: string;

    public getId(): mongoose.Types.ObjectId {
        return this.id;
    }

    public getFullname(): string {
        return this.fullname;
    }

    public setFullname(fullname: string): void {
        this.fullname = fullname;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getRole_id(): Types.ObjectId {
        return this.role_id;
    }

    public setRole_id(role_id: Types.ObjectId): void {
        this.role_id = role_id;
    }

    public getImageUser(): string {
        return this.imageUser;
    }

    public setImageUser(imageUser: string): void {
        this.imageUser = imageUser;
    }

    public isEmailConfirmed(): boolean {
        return this.emailConfirmed;
    }

    public setEmailConfirmed(emailConfirmed: boolean): void {
        this.emailConfirmed = emailConfirmed;
    }

    public isPhoneConfirmed(): boolean {
        return this.phoneConfirmed;
    }

    public setPhoneConfirmed(phoneConfirmed: boolean): void {
        this.phoneConfirmed = phoneConfirmed;
    }

    public getEmailCode(): string {
        return this.emailCode;
    }

    public setEmailCode(emailCode: string): void {
        this.emailCode = emailCode;
    }

    public isEnable2FA(): boolean {
        return this.enable2FA;
    }

    public setEnable2FA(enable2FA: boolean): void {
        this.enable2FA = enable2FA;
    }

    public getTwoFASecret(): string {
        return this.twoFASecret;
    }

    public setTwoFASecret(twoFASecret: string): void {
        this.twoFASecret = twoFASecret;
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
    this.id = new mongoose.Types.ObjectId;
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
