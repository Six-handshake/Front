import { create } from "zustand";
import { Node, Edge } from "../api";

interface useDataStoreStateProps {
    nodes: Node[],
    edges: Edge[],
    setNodes: (nodes: Node[]) => void,
    setEdges: (edges: Edge[]) => void,
}

const useData = create<useDataStoreStateProps>((set) => ({
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

export {useData};  