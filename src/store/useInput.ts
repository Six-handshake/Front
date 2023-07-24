import { create } from "zustand";
import { RegionType } from "../shared/inputFilters";

interface useInputStoreStateProps {
    firstRegions: RegionType[],
    secondRegions: RegionType[],
    setFirstRegions: (nodes: RegionType[]) => void,
    setSecondRegions: (edges: RegionType[]) => void,
}

const useInput = create<useInputStoreStateProps>((set) => ({
    firstRegions: [],
    secondRegions: [],
    setFirstRegions: (regions: RegionType[]) => 
    {
            set(() => ({
            firstRegions: regions
        }))
    },
    setSecondRegions: (regions: RegionType[]) => 
    {
            set(() => ({
            secondRegions: regions
        }))
    },

}));

export {useInput};  