import { create } from "zustand";
import { ContragentsDataType } from "../api";
import { Node, Edge } from "../api";

interface storeStateProps {
    nodes: Node[],
    edges: Edge[],
    setNodes: (nodes: Node[]) => void,
    setEdges: (edges: Edge[]) => void,

}

const useStore = create<storeStateProps>((set) => ({
    nodes: [],
    edges: [],
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

}));

export default useStore;  