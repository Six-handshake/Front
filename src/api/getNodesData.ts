import axios from "axios";
import { ContragentsDataType } from "./types";

const URL = "http://46.48.3.74:5333/api/front_v2";

export const getContragentsData = async() => {    
    const data = await axios.get<ContragentsDataType>(URL);

    return data;
};
