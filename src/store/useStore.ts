import { create } from "zustand";
import { Node, Edge } from "../api";
import { RegionType, ConvertedRegionType, ConvertedOkvedType } from "../shared/inputFilters";
import { CheckboxValueType } from "antd/es/checkbox/Group";

interface storeStateProps {
    nodes: Node[],
    edges: Edge[],
    firstFilters: CheckboxValueType[],
    secondFilters: CheckboxValueType[],
    firstActivities: string[],
    secondActivities: string[],
    firstRegions: string[],
    secondRegions: string[],
    isLoading: boolean,
    setFirstFilters: (filters: CheckboxValueType[]) => void,
    setSecondFilters: (filters: CheckboxValueType[]) => void,
    setFirstActivities: (activities: ConvertedOkvedType[]) => void,
    setSecondActivities: (activities: ConvertedOkvedType[]) => void,
    setFirstRegions: (regions: ConvertedRegionType[]) => void,
    setSecondRegions: (regions: ConvertedRegionType[]) => void,
    setNodes: (nodes: Node[]) => void,
    setEdges: (edges: Edge[]) => void,
    switchIsLoading: () => void
}

const useStore = create<storeStateProps>((set) => ({
    nodes: [],
    edges: [],
    firstFilters: ['Company', 'People'],
    secondFilters: ['Company', 'People'],
    firstActivities: [],
    secondActivities: [],
    firstRegions: [],
    secondRegions: [],
    isLoading: false,
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
        const convertedActivities = activities.map((activity) => String(activity.id))
        set(() => ({
            firstActivities: convertedActivities
        }))
    },
    setSecondActivities: (activities: ConvertedOkvedType[]) => {
        const convertedActivities = activities.map((activity) => String(activity.id))
        set(() => ({
            secondActivities: convertedActivities
        }))
    },
    setFirstRegions: (regions: ConvertedRegionType[]) => 
    {
        const convertedRegions = regions.map((region) => String(region.id))
        set(() => ({
            firstRegions: convertedRegions
        }))
    },
    setSecondRegions: (regions: ConvertedRegionType[]) => 
    {
        const convertedRegions = regions.map((region) => String(region.id))
            set(() => ({
            secondRegions: convertedRegions
        }))
    },
    switchIsLoading: () => {
        set((state) => ({
            isLoading: !state.isLoading
        }))
    }
}));

export default useStore;  