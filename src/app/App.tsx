import { CardChild } from "../shared/cards";
import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import React, { useEffect, useState } from "react";
import { Stack, InputGroup, Input } from "@chakra-ui/react";
import CardBoard from "../shared/cardBoard/CardBoard";
// import ReactFlow, {
//     MiniMap,
//     Controls,
//     Background,
//     useNodesState,
//     useEdgesState,
//     addEdge,
//   } from 'reactflow';

// const elements = [
//     {
//         id: '1',
//         type: 'input',
//         data: { label: 'Входная нода' },
//         position: {x: 100, y: 50}
//     },
//     {
//         id: '2',
//         type: 'input',
//         data: { label: 'Входная нода 2' },
//         position: {x: 300, y: 50}
//     },
// ]

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// const minimapStyle = {
//     height: 500,
//     width: 1000,
//     backgroundColor: '#B8CEFF'
//   };


function App() {
    const TodosContext = React.createContext({
        todos: [],
        fetchTodos: () => {},
    });

    function Todos() {
        const [todos, setTodos] = useState([]);
        const fetchTodos = async () => {
            const response = await fetch("api/todo");
            const todos = await response.json();
            setTodos(todos.data);
        };
        useEffect(() => {
            fetchTodos();
        }, []);
        return (
            <TodosContext.Provider value={{ todos, fetchTodos }}>
                <AddTodo />
                {/* <Stack spacing={5}>
                    {todos.map((todo) => (
                        <b>{todo.message}</b>
                    ))}
                </Stack> */}
            </TodosContext.Provider>
        );
    }
    function AddTodo() {
        const [message, setItem] = React.useState("");
        const { todos, fetchTodos } = React.useContext(TodosContext);

        const handleInput = (event: any) => {
            setItem(event.target.value);
        };

        const handleSubmit = () => {
            const newTodo = {
                id: todos.length + 1,
                message: message,
            };

            fetch("/api/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            }).then(fetchTodos);
        };

        return (
            <form onSubmit={handleSubmit}>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type="text"
                        placeholder="Add a todo item"
                        aria-label="Add a todo item"
                        onChange={handleInput}
                    />
                </InputGroup>
            </form>
        );
    }

//     const [nodes, setNodes, onNodesChange] = useNodesState(elements);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    return (
        <Container>
            {/* <div className="h-80 w-100">
            </div> */}
            <div className="h-80 w-100">
                <CardBoard />
            </div>
            <div className="w-full h-screen flex flex-col justify-left gap-7">
                <div className=" w-1/3">
                    <InputKonterAgent />
                </div>
                <div>
                    <CardChild
                        companyName="Тензор"
                        adress="Максима Горького 24"
                        id="1"
                        phone="79999999999"
                    />
                    <CardChild
                        companyName="Тензор"
                        adress="Максима Горького 24"
                        id="2"
                    />
                </div>
                <div>{Todos()}</div>
            </div>
        </Container>
    );
}

export { App };
