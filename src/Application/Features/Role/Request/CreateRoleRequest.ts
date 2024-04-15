export class CreateRoleRequest {
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


}