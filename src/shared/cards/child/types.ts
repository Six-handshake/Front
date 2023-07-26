import { Node } from "../../../api"

type CardChildInfo = {
    inn: string,
    dataReg: string, 
    okved: string,
    profit: number,
    revenue: number,
    region: string
}

export interface CardChildPropsType {
    data: {
        info: CardChildInfo,
        title: string,
        node: Node
        handleCardClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void 
    }
}
