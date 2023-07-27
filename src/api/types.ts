type PrivateFaceInfo = {    
    lastname: string,
    firstname: string,
    patronymic: string,
    inn: string     
}

type LegalFaceInfo = {
    inn: string,
    revenue: number,
    profit: number,
    name: string,
    is_ip: boolean,
    reg_date: string,
    liq_date: string,
    okved: string,
    region: string
}

type Node = {
    id: string,
    info: PrivateFaceInfo & LegalFaceInfo,
    type: string,
    depth_x: number,
    depth_y: number,
    is_child: boolean
}

type Edge = {
    parent_id: string,
    child_id: string,
    kind: string,
    share: string,
    date_begin: string,
    date_end: string,
    between_depth: boolean
}

type ContragentsDataType = {
   nodes : Node[],
   edges: Edge[] 
};

type FindRelationshipType = {
    firstContragent: {
        data: string,
        isPerson: boolean,
        isCompany: boolean,
        okved: string[],
        regions: string[]
    }
    secondContragent:{
        data: string,
        isPerson: boolean,
        isCompany: boolean,
        okved: string[],
        regions: string[]
    }
}

type FindCoincidenceType = {
    text: string,
    okved?: string[],
    regions?: string[],
    is_person: boolean,
    is_company: boolean
}

type FindCoincindeceRequestType = {
    text: string,
    is_person: boolean,
    is_company: boolean,
    inn: string,
    okved: string,
    region: string,
}

export type {ContragentsDataType, Node, Edge, FindRelationshipType, FindCoincidenceType, FindCoincindeceRequestType};