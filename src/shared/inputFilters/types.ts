type RegionType = {
    id: number,
    district_id: number,
    name: string
}

type ConvertedRegionType = {
    id: number,
    label: string,
    value: string
}

type OkvedType = {
    Name: string,
    Idx: string,
    Razdel: string,
    Kod: string,
    Nomdescr: string,
    global_id: number
}

type ConvertedOkved = {
    name: string,
    id: number,
    code: string 
}

type ConvertedOkvedType = {
    id: number,
    label: string,
    value: string
}


export type {RegionType, ConvertedRegionType, OkvedType, ConvertedOkved, ConvertedOkvedType};