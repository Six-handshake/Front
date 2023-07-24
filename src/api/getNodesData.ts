import axios from "axios";
import { ContragentsDataType } from "./types";
import { URL_DATA } from "./urls";

export const getContragentsData = async() => {    
    const data = await axios.get<ContragentsDataType>(URL_DATA);

    return data;
};
