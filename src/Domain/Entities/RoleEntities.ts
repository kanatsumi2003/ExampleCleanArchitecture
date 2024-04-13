import { BaseEntities } from "./BaseEntites";

class Role {
  private _name: string;
  private _description: string;
  private _isAdmin: boolean;
  private _listClaim: string[];

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public set isAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }

  public get listClaim(): string[] {
    return this._listClaim;
  }

  public set listClaim(listClaim: string[]) {
    this._listClaim = listClaim;
  }

  constructor(
    name: string,
    description: string,
    isAdmin: boolean,
    listClaim: string[]
  ) {
    this.name = name;
    this.description = description;
    this.isAdmin = isAdmin;
    this.listClaim = listClaim;
  }
}
class RoleWithBase extends BaseEntities {
  constructor(role: Role) {
    super();
    Object.assign(this, role);
  }
}

export { Role, RoleWithBase };
