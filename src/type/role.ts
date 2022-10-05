export interface IRoleList {
    authority: number[]
    roleId: number
    roleName: string
}
export class RoleList{
    list:IRoleList[] = []
}