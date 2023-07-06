import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";

const TodosContext = React.createContext({
    todos: [],
    fetchTodos: () => {},
});

export function Todos() {
    const [todos, setTodos] = useState([]);
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:1234/todo");
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
