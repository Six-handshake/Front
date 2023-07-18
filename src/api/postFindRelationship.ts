import { URL_FIND_DATA } from "./urls";
import axios from "axios";
import { FindRelationshipType } from "./types";

const findRelationship = async (response : FindRelationshipType) => {
    const findRelationshipServerType = {
        index1 : 
        {
            data: response.firstContragent.data,
            is_person: response.firstContragent.isPerson,
            is_company: response.firstContragent.isCompany,
        },
        index2: {
            data: response.secondContragent.data,
            is_person: response.secondContragent.isPerson,
            is_company: response.secondContragent.isCompany,
        }
    }
    
    const data = await axios.post(URL_FIND_DATA, findRelationshipServerType);
    return data;
}

export {findRelationship};