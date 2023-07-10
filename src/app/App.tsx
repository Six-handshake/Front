import { CardChild } from "../shared/cards";
import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import React, { useEffect, useState } from "react";
import { InputGroup, Input } from "@chakra-ui/react";
import { CardsBoard } from "../shared/cardsBoard";

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
    return (
        <Container>
            <div className=" w-1/3">
                <InputKonterAgent />
            </div>
            <div className="h-80 w-100">
                <CardsBoard />
            </div>
            <div className="w-full h-screen flex flex-col justify-left gap-7">
                <div>{Todos()}</div>
            </div>
        </Container>
    );
}

export { App };
