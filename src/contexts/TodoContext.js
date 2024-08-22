import { useContext, createContext } from "react";

export const TodoContext = createContext({
    // array of todo objects    ----> property
    todos: [
        {
            id: 1,
            todo: "Todo Msg",
            completed: false,
        }
    ],

    // manipulate todo's    ----> functions
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
    clearTodo: () => {},
    // clearCompleted: (todos) => {}
});

export const TodoProvider = TodoContext.Provider;

export default function useTodo() {
    return useContext(TodoContext);
}