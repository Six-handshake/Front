type CardParentInfo = {
    lastname: string,
    firstname: string,
    inn: string  
}

type CardChildInfo = {
    inn: string,
    dataReg: string, 
    okved: string,
    profit: number,
    revenue: number,
    region: string
}

interface CardParentPropsType{
    data: {
        role?: string,
        title?: string,
        id?: string,
        info: CardParentInfo & CardChildInfo,
    }
}
// interface CardParentPropsType{
//     role?: string,
//     title?: string,
//     id?: string,
// }

export type {CardParentPropsType};