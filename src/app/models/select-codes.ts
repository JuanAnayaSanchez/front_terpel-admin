export interface DataSelectCodes {
    data: CodesData[];
}

export interface CodesData {
    id: number
    user_id: any
    name: string
    used: number
    date: string
    userName: any
}

export interface DataCodeGenerate{
    prmnumber_codes:number
}

export interface DataCodeDelete{
    prmCodeId:number
}