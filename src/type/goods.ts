export interface IGoodsList {
    userId: number,
    id: number,
    title: string,
    introduce: string
}
export interface ISelectData {
    title: string,
    introduce: string,
    page: number,//页码
    count: number,//总条数
    pageSize: number//默认一页显示条数
}

export class InitData {
    list: IGoodsList[] = [];
    selectData: ISelectData = {
        title: "",
        introduce: "",
        page: 1,//页码
        count: 0,//总条数
        pageSize: 5//默认一页显示条数 
    };
}