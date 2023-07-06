import { CardChild } from "../shared/cards";
import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";

function App() {
    const TodosContext = React.createContext({
        todos: [],
        fetchTodos: () => {},
    });

    function Todos() {
        const [todos, setTodos] = useState([]);
        const fetchTodos = async () => {
            const response = await fetch("api");
            const todos = await response.json();
            setTodos(todos.data);
        };
        useEffect(() => {
            fetchTodos();
        }, []);
        return (
            <TodosContext.Provider value={{ todos, fetchTodos }}>
                <Stack spacing={5}>
                    {todos.map((todo) => (
                        <b>{todo.message}</b>
                    ))}
                </Stack>
            </TodosContext.Provider>
        );
    }
    return (
        <Container>
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
