import { create } from "zustand";
import { Node, Edge } from "../api";
import { RegionType } from "../shared/inputFilters";

interface storeStateProps {
    nodes: Node[],
    edges: Edge[],
    firstRegions: RegionType[],
    secondRegions: RegionType[],
    setFirstRegions: (nodes: RegionType[]) => void,
    setSecondRegions: (edges: RegionType[]) => void,
    setNodes: (nodes: Node[]) => void,
    setEdges: (edges: Edge[]) => void,
}

const useStore = create<storeStateProps>((set) => ({
    nodes: [],
    edges: [],
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
    }
}));

export default useStore;  