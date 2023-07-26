import { URL_FIND_DATA } from "./urls";
import axios from "axios";
import { FindRelationshipType } from "./types";

const findRelationship = async (response : FindRelationshipType)  => {
    const {firstContragent, secondContragent} = response;
    const findRelationshipServerType = {
        index1 : 
        {
            data: firstContragent.data,
            is_person: firstContragent.isPerson,
            is_company: firstContragent.isCompany,
            okved: firstContragent.okved,
            regions: firstContragent.regions
        },
        index2: {
            data: secondContragent.data,
            is_person: secondContragent.isPerson,
            is_company: secondContragent.isCompany,
            okved: secondContragent.okved,
            regions: secondContragent.regions
        }
    }
    
    return await axios.post(URL_FIND_DATA, findRelationshipServerType);
}

export {findRelationship};