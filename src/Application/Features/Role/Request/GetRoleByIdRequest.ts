export class GetRoleByIdRequest {
    private roleId: string;

    public getRoleId(): string {
        return this.roleId;
    }

    public setRoleId(roleId: string): void {
        this.roleId = roleId;
    }
}