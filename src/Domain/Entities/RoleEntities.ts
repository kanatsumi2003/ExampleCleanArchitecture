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
  constructor(role: Role) {
    super();
    Object.assign(this, role);
  }
}

export { Role, RoleWithBase };
