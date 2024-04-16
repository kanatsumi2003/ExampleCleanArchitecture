import { BaseEntities } from "./BaseEntites";

class Role {
  private name: string;
  private description: string;
  private isAdmin: boolean;
  private listClaim: string[];


    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public isIsAdmin(): boolean {
        return this.isAdmin;
    }

    public setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }

    public getListClaim(): string[] {
        return this.listClaim;
    }

    public setListClaim(listClaim: string[]): void {
        this.listClaim = listClaim;
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
  private role!: Role
  constructor(role: Role) {
    super();
    Object.assign(this, role);
  }
  public getName(): string {
    return this.role.getName();
  }

  public setName(name: string): void {
    this.role.setName(name);
  }

  public getDescription(): string {
    return this.role.getDescription();
  }

  public setDescription(description: string): void {
    this.role.setDescription(description);
  }

  public isIsAdmin(): boolean {
    return this.role.isIsAdmin();
  }

  public setIsAdmin(isAdmin: boolean): void {
    this.role.setIsAdmin(isAdmin);
  }

  public getListClaim(): string[] {
    return this.role.getListClaim();
  }

  public setListClaim(listClaim: string[]): void {
    this.role.setListClaim(listClaim);
  }
}

export { Role, RoleWithBase };
