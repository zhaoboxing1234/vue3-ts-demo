export interface IUserList {
    id: number
    nickName: string
    role: IRole[]
    userName: string
}

export interface IRole {
    role: number,
    roleName: string
}
export interface ISelectData {
    role: number
    nickName: string
}

export interface IRoleList {
    authority:number[]
    roleId:number
    roleName:string
}
export class UserList {
    selectData: ISelectData = {
        role: 0,
        nickName: ""
    }
    list: IUserList[] = [] //用户信息
    roleList:IRoleList[] = []//角色信息
}