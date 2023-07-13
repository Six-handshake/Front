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
    depth: string
}

type Edge = {
    parent_id: string,
    child_id: string,
    kind: string
}

type ContragentsDataType = {
   nodes : Node[],
   edges: Edge[] 
};
// type NodesDataType = {
//     parent: {
//         inn: string;
//         revenue: number;
//         profit: number;
//         name: string;
//         is_ip: boolean;
//         reg_date: string;
//         liq_date: string;
//         okved: string;
//         region: string;
//         id: string;
//     };
//     child: {
//         inn: string;
//         revenue: number;
//         profit: number;
//         name: string;
//         is_ip: boolean;
//         reg_date: string;
//         liq_date: object;
//         okved: string;
//         region: string;
//         id: string;
//     };
//     depth: number;
// }[];

export type {ContragentsDataType, Node, Edge};