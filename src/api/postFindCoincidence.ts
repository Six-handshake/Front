import { URL_FIND_COINCIDENCE } from "./urls";
import axios from "axios";
import { FindCoincidenceType } from ".";

const findCoincidence = async (response : FindCoincidenceType)  => {
    
    const data = await axios.post(URL_FIND_COINCIDENCE, response)
        .then(data => {
            return data.data
        })
        .catch(err => {
            console.error('findCoincidence error', err)
        });

    return data;
}

export {findCoincidence}