type PrivateFaceInfo = {    
    lastname: string,
    firstname: string,
    patronymyic: string,
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
    is_child: boolean,
    

}

type Edge = {
    parent_id: string,
    child_id: string,
    kind: string,
    share: string,
    date_begin: string,
    date_end: string
}

type ContragentsDataType = {
   nodes : Node[],
   edges: Edge[] 
};

type FindRelationshipType = {
    firstContragent: {
        data: string,
        isPerson: boolean,
        isCompany: boolean
    }
    secondContragent:{
        data: string,
        isPerson: boolean,
        isCompany: boolean
    }
}

export type {ContragentsDataType, Node, Edge, FindRelationshipType};