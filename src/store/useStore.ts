import { create } from "zustand";
import { Node, Edge } from "../api";
import { RegionType, ConvertedRegionType, ConvertedOkvedType } from "../shared/inputFilters";
import { CheckboxValueType } from "antd/es/checkbox/Group";

interface storeStateProps {
    nodes: Node[],
    edges: Edge[],
    firstFilters: CheckboxValueType[],
    secondFilters: CheckboxValueType[],
    firstActivities: ConvertedOkvedType[],
    secondActivities: ConvertedOkvedType[],
    firstRegions: ConvertedRegionType[],
    secondRegions: ConvertedRegionType[],
    setFirstFilters: (filters: CheckboxValueType[]) => void,
    setSecondFilters: (filters: CheckboxValueType[]) => void,
    setFirstActivities: (activities: ConvertedOkvedType[]) => void,
    setSecondActivities: (activities: ConvertedOkvedType[]) => void,
    setFirstRegions: (regions: ConvertedRegionType[]) => void,
    setSecondRegions: (regions: ConvertedRegionType[]) => void,
    setNodes: (nodes: Node[]) => void,
    setEdges: (edges: Edge[]) => void,
}

const useStore = create<storeStateProps>((set) => ({
    nodes: [],
    edges: [],
    firstFilters: [],
    secondFilters: [],
    firstActivities: [],
    secondActivities: [],
    firstRegions: [],
    secondRegions: [],
    setNodes: (nodes: Node[]) => 
    {
            set(() => ({
            nodes: nodes
        }))
    },
    setEdges: (edges: Edge[]) => 
    {
            set(() => ({
            edges: edges
        }))
    },
    setFirstFilters: (filters: CheckboxValueType[]) => {
        set(() => ({
            firstFilters: filters
        }))
    },
    setSecondFilters: (filters: CheckboxValueType[]) => {
        set(() => ({
            secondFilters: filters
        }))
    },
    setFirstActivities: (activities: ConvertedOkvedType[]) => {
        set(() => ({
            firstActivities: activities
        }))
    },
    setSecondActivities: (activities: ConvertedOkvedType[]) => {
        set(() => ({
            secondActivities: activities
        }))
    },
    setFirstRegions: (regions: ConvertedRegionType[]) => 
    {
            set(() => ({
            firstRegions: regions
        }))
    },
    setSecondRegions: (regions: ConvertedRegionType[]) => 
    {
            set(() => ({
            secondRegions: regions
        }))
    }
}));

export default useStore;  