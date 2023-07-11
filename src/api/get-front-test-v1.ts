import axios from "axios";

export type GetFrontTestV1Type = {
    parent: {
        inn: string;
        revenue: number;
        profit: number;
        name: string;
        is_ip: boolean;
        reg_date: string;
        liq_date: string;
        okved: string;
        region: string;
        id: string;
    };
    child: {
        inn: string;
        revenue: number;
        profit: number;
        name: string;
        is_ip: boolean;
        reg_date: string;
        liq_date: object;
        okved: string;
        region: string;
        id: string;
    };
    depth: number;
}[];

export const getFrontTestV1 = () => {
    return axios.get<GetFrontTestV1Type>("http://46.48.3.74:5333/api/front_v1");
};
