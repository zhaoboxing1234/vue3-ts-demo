export interface IAuthority{
    name:string
    roleId:number
    roleList?:IAuthority[]
    viewRole?:string
}
export class Authority {
    id: number
    authority: number[]
    constructor(id: number, authority: number[]) {
        this.id = id;
        this.authority = authority;
    }
    list:IAuthority[] = [];
    treeRef:any
}